variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. production, staging)"
  type        = string
}

variable "domain_name" {
  description = "Root domain name (e.g. thespiritmolecule.ai)"
  type        = string
}
