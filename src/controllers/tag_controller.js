import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("Tag Controller Connected!", this.element)
  }
}
