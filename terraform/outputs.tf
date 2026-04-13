# =============================================================================
# Root Outputs
# =============================================================================

# -----------------------------------------------------------------------------
# Networking
# -----------------------------------------------------------------------------
output "vpc_id" {
  description = "ID of the VPC"
  value       = data.terraform_remote_state.shared_vpc.outputs.vpc_id
}

# -----------------------------------------------------------------------------
# ALB
# -----------------------------------------------------------------------------
output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = module.alb.alb_dns_name
}

# -----------------------------------------------------------------------------
# DNS / TLS
# -----------------------------------------------------------------------------
output "acm_validation_records" {
  description = "CNAME records to add at your DNS provider for ACM certificate validation"
  value       = var.domain_name != "" ? module.dns[0].domain_validation_records : []
}

output "domain_cname_target" {
  description = "Point your domain (CNAME or ALIAS record) to this ALB DNS name"
  value       = module.alb.alb_dns_name
}

# -----------------------------------------------------------------------------
# ECR
# -----------------------------------------------------------------------------
output "ecr_repository_url" {
  description = "URL of the ECR repository (for CI/CD image pushes)"
  value       = module.ecr.repository_url
}

# -----------------------------------------------------------------------------
# ECS
# -----------------------------------------------------------------------------
output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.ecs.cluster_name
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = module.ecs.service_name
}

# -----------------------------------------------------------------------------
# CloudFront / S3
# -----------------------------------------------------------------------------
output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (for cache invalidation)"
  value       = module.s3_cloudfront.cloudfront_distribution_id
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name (use as ASSET_PREFIX)"
  value       = module.s3_cloudfront.cloudfront_domain_name
}

output "s3_bucket_name" {
  description = "Name of the S3 static assets bucket"
  value       = module.s3_cloudfront.s3_bucket_name
}

output "asset_prefix" {
  description = "Full ASSET_PREFIX URL for Next.js builds"
  value       = module.s3_cloudfront.asset_prefix
}

# -----------------------------------------------------------------------------
# IAM (CI/CD)
# -----------------------------------------------------------------------------
output "github_actions_deploy_role_arn" {
  description = "ARN of the GitHub Actions deployment role (set as AWS_ROLE_ARN in GitHub secrets)"
  value       = module.iam.github_actions_deploy_role_arn
}
