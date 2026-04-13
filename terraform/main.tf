# =============================================================================
# Terraform Root Configuration
# =============================================================================
# conscious-pregnancy: Next.js + ECS + ALB + S3/CloudFront (no RDS).
# =============================================================================

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Create this bucket before first init:
  # aws s3 mb s3://conscious-pregnancy-tf-state-us-east-2 --region us-east-2
  # aws s3api put-bucket-versioning --bucket conscious-pregnancy-tf-state-us-east-2 --versioning-configuration Status=Enabled
  backend "s3" {
    bucket  = "conscious-pregnancy-tf-state-us-east-2"
    key     = "production/terraform.tfstate"
    region  = "us-east-2"
    encrypt = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# =============================================================================
# Security Groups (ALB + ECS only; no RDS, ElastiCache)
# =============================================================================

module "security_groups" {
  source = "./modules/security_groups"

  project_name = var.project_name
  environment  = var.environment
  vpc_id       = data.terraform_remote_state.shared_vpc.outputs.vpc_id
}

# =============================================================================
# Container Registry
# =============================================================================

module "ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  environment  = var.environment
}

# =============================================================================
# IAM Roles
# =============================================================================

module "iam" {
  source = "./modules/iam"

  project_name        = var.project_name
  environment         = var.environment
  secrets_manager_arn = aws_secretsmanager_secret.app.arn
  github_repository   = var.github_repository
}

# =============================================================================
# Secrets Manager (minimal placeholder; add real secrets in AWS Console)
# =============================================================================

resource "aws_secretsmanager_secret" "app" {
  name        = "${var.project_name}/app-secrets"
  description = "App secrets for conscious-pregnancy frontend"

  tags = {
    Name        = "${var.project_name}-app-secrets"
    Environment = var.environment
  }
}

resource "aws_secretsmanager_secret_version" "app" {
  secret_id = aws_secretsmanager_secret.app.id
  secret_string = jsonencode({
    APP_BASE_URL  = var.domain_name != "" ? "https://${var.domain_name}" : "https://placeholder"
    BREVO_API_KEY = "placeholder"
    BREVO_LIST_ID = "placeholder"
  })

  lifecycle {
    ignore_changes = [secret_string]
  }
}

locals {
  ecs_secrets = [
    { name = "APP_BASE_URL", valueFrom = "${aws_secretsmanager_secret.app.arn}:APP_BASE_URL::" },
    { name = "BREVO_API_KEY", valueFrom = "${aws_secretsmanager_secret.app.arn}:BREVO_API_KEY::" },
    { name = "BREVO_LIST_ID", valueFrom = "${aws_secretsmanager_secret.app.arn}:BREVO_LIST_ID::" },
  ]
}

# =============================================================================
# DNS / TLS (ACM Certificate) - optional when domain_name is set
# =============================================================================

module "dns" {
  source = "./modules/dns"
  count  = var.domain_name != "" ? 1 : 0

  project_name = var.project_name
  environment  = var.environment
  domain_name  = var.domain_name
}

# =============================================================================
# Application Load Balancer
# =============================================================================

module "alb" {
  source = "./modules/alb"

  project_name        = var.project_name
  environment         = var.environment
  vpc_id              = data.terraform_remote_state.shared_vpc.outputs.vpc_id
  public_subnet_ids   = data.terraform_remote_state.shared_vpc.outputs.public_subnet_ids
  security_group_id   = module.security_groups.alb_security_group_id
  enable_https        = var.domain_name != ""
  acm_certificate_arn = var.domain_name != "" ? module.dns[0].acm_certificate_arn : ""
}

# =============================================================================
# ECS Fargate (Frontend)
# =============================================================================

module "ecs" {
  source = "./modules/ecs"

  project_name        = var.project_name
  environment         = var.environment
  aws_region          = var.aws_region
  ecr_repository_url  = module.ecr.repository_url
  image_tag           = var.image_tag
  cpu                 = var.ecs_cpu
  memory              = var.ecs_memory
  desired_count       = var.ecs_desired_count
  min_count           = var.ecs_min_count
  max_count           = var.ecs_max_count
  execution_role_arn  = module.iam.ecs_task_execution_role_arn
  task_role_arn       = module.iam.ecs_task_role_arn
  subnet_ids          = data.terraform_remote_state.shared_vpc.outputs.public_subnet_ids
  security_group_id   = module.security_groups.ecs_security_group_id
  target_group_arn    = module.alb.target_group_arn
  initial_admin_email = ""
  secrets             = local.ecs_secrets

  depends_on = [module.alb]
}

# =============================================================================
# S3 + CloudFront (Static Assets)
# =============================================================================

module "s3_cloudfront" {
  source = "./modules/s3_cloudfront"

  project_name    = var.project_name
  environment     = var.environment
  price_class     = var.cloudfront_price_class
  allowed_origins = length(var.cdn_allowed_origins) > 0 ? var.cdn_allowed_origins : ["*"]
  bucket_suffix   = ""
}
