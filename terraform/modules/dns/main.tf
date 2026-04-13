# =============================================================================
# DNS Module
# =============================================================================
# Creates an ACM certificate with DNS validation. DNS records are managed
# externally — check the root outputs for the CNAME records to add at your
# domain provider, and the ALB DNS name to point your domain at.
# =============================================================================

resource "aws_acm_certificate" "main" {
  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  tags = {
    Name        = "${var.project_name}-cert"
    Environment = var.environment
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn = aws_acm_certificate.main.arn
}
