# =============================================================================
# Shared VPC (remote state)
# =============================================================================
# All Superconscious apps share a single VPC managed in a separate Terraform
# root. This data source reads its outputs so per-app modules can reference
# vpc_id, public_subnet_ids, and private_subnet_ids without creating their own.
# =============================================================================

data "terraform_remote_state" "shared_vpc" {
  backend = "s3"

  config = {
    bucket = "aws-shared-config-tf-state-us-east-2"
    key    = "terraform.tfstate"
    region = "us-east-2"
  }
}
