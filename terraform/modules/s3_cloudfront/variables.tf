variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g. production, staging)"
  type        = string
}

variable "price_class" {
  description = "CloudFront price class (PriceClass_100 = US/EU, PriceClass_200 = US/EU/Asia, PriceClass_All)"
  type        = string
  default     = "PriceClass_100"
}

variable "allowed_origins" {
  description = "Allowed origins for CORS on static assets (e.g. [\"https://thespiritmolecule.ai\"])"
  type        = list(string)
}

variable "bucket_suffix" {
  description = "Optional suffix for the S3 bucket name to avoid naming conflicts"
  type        = string
  default     = ""
}
