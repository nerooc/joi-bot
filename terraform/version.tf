#### Configure backend ####
terraform {
required_version = “~>0.14.0”
backend “gcs” {}
required_providers {
google = {
source = “hashicorp/google”
version = “~>3.64.0”
}
}
}