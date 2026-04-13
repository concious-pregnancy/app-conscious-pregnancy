# =============================================================================
# Production — consciouspregnancy.care
# =============================================================================

aws_region   = "us-east-2"
project_name = "conscious-pregnancy"
environment  = "production"

image_tag         = "latest"
ecs_cpu           = 512
ecs_memory        = 1024
ecs_desired_count = 1
ecs_min_count     = 1
ecs_max_count     = 4

domain_name = "consciouspregnancy.care"

cloudfront_price_class = "PriceClass_100"
cdn_allowed_origins    = ["https://consciouspregnancy.care"]

github_repository = "dfp-side-hustle/cowork-concsious-pregnancy"
