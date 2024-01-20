import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    unchecked: String,
    checked: String
  }

  static targets = ["input", "label"]

  connect() {
    this.inputTarget.addEventListener("change", this)
    this.setLabel()
  }

  disconnect() {
    this.inputTarget.removeEventListener("change", this)
  }

  handleEvent(event) {
    this.setLabel()
  }

  setLabel() {
    if (this.inputTarget.checked) {
      this.labelTarget.textContent = this.checkedValue
    } else {
      this.labelTarget.textContent = this.uncheckedValue
    }
  }
}
