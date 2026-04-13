variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. production, staging)"
  type        = string
}

variable "secrets_manager_arn" {
  description = "ARN of the Secrets Manager secret containing app secrets"
  type        = string
}

variable "github_repository" {
  description = "GitHub repository in owner/repo format (e.g. psychadelics-ai/spirit-molecule-ai)"
  type        = string
}
