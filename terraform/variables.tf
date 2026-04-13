# =============================================================================
# Root Variables
# =============================================================================

# -----------------------------------------------------------------------------
# General
# -----------------------------------------------------------------------------
variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "conscious-pregnancy"
}

variable "environment" {
  description = "Environment name (e.g. production, staging)"
  type        = string
  default     = "production"
}

# -----------------------------------------------------------------------------
# ECS
# -----------------------------------------------------------------------------
variable "image_tag" {
  description = "Docker image tag to deploy (typically a git SHA)"
  type        = string
  default     = "latest"
}

variable "ecs_cpu" {
  description = "CPU units for the Fargate task (256, 512, 1024, 2048, 4096)"
  type        = number
  default     = 512
}

variable "ecs_memory" {
  description = "Memory (MB) for the Fargate task"
  type        = number
  default     = 1024
}

variable "ecs_desired_count" {
  description = "Desired number of running ECS tasks"
  type        = number
  default     = 1
}

variable "ecs_min_count" {
  description = "Minimum number of ECS tasks for auto-scaling"
  type        = number
  default     = 1
}

variable "ecs_max_count" {
  description = "Maximum number of ECS tasks for auto-scaling"
  type        = number
  default     = 4
}

# -----------------------------------------------------------------------------
# Domain / HTTPS
# -----------------------------------------------------------------------------
variable "domain_name" {
  description = "Root domain name for the application. Leave empty to skip DNS/TLS setup."
  type        = string
  default     = ""
}

# -----------------------------------------------------------------------------
# CloudFront
# -----------------------------------------------------------------------------
variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
}

variable "cdn_allowed_origins" {
  description = "Allowed origins for CORS on CDN static assets"
  type        = list(string)
  default     = []
}

# -----------------------------------------------------------------------------
# GitHub Actions (CI/CD)
# -----------------------------------------------------------------------------
variable "github_repository" {
  description = "GitHub repository in owner/repo format for OIDC trust policy"
  type        = string
  default     = "dfp-side-hustle/cowork-concsious-pregnancy"
}
