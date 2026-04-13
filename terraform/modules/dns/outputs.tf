output "acm_certificate_arn" {
  description = "ARN of the validated ACM certificate"
  value       = aws_acm_certificate_validation.main.certificate_arn
}

output "domain_validation_records" {
  description = "CNAME records to add at your DNS provider for certificate validation"
  value = [for dvo in aws_acm_certificate.main.domain_validation_options : {
    name  = dvo.resource_record_name
    type  = dvo.resource_record_type
    value = dvo.resource_record_value
  }]
}
