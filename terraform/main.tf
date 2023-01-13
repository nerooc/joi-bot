provider “google” {
    project = var.project_id
    region = var.region
    zone = var.zone
    impersonate_service_account = var.tf_service_account
}

resource "google_project" "my_project" {
  name = "Firestore"
  project_id = "terraform-test-joi"
}

resource "google_app_engine_application" "app" {
  project     = google_project.my_project.project_id
  location_id = "europe-central2-a"
  database_type = "CLOUD_FIRESTORE"
}