provider "google" {
  project = "joi-terraform-test-3"
  region = "europe-central2"
  zone = "europe-central2-a"
}

// Create GCP project
resource "google_project" "joi-terraform-test-3" {
  name = "JOI Terraform test"
  project_id = "joi-terraform-test-3"
}

// Enable Firestore API
resource google_project_service "firestore" {
  project = "${google_project.joi-terraform-test-3.project_id}"
  service = "firestore.googleapis.com"
}

// Create Firestore database
resource "google_app_engine_application" "database-app" {
  project     = "${google_project.joi-terraform-test-3.project_id}"
  location_id = "europe-central2"
  database_type = "CLOUD_FIRESTORE"
}

// Add a test document to the Firestore database
resource "google_firestore_document" "test-document" {
    project     = "${google_project.joi-terraform-test-3.project_id}"
    collection  = "user_requests"
    document_id = "nerooc-2023-01-13T09:30:35Z"   
    fields       = "{\"request\":{\"mapValue\":{\"fields\":{\"command\":{\"stringValue\":\"play\"}}}}}"
}
