variable "role_name" {
  default = "custom-role"
}

variable "account_id" {
  default   = "919759177803"
  sensitive = true
}

variable "ecr_uri" {
  default = "public.ecr.aws/b2b5p2f4/typer:latest"
}

variable "mongo_uri" {
  sensitive = true
}