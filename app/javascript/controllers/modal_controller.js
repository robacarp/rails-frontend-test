import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    'modal'
  ]

  show(e) {
    e.preventDefault();

    this.modalTarget.open = true
    document.querySelector('.desktop-overlay').classList.remove('hidden')
    this.modalTarget.classList.remove('hidden')
  }

  hide(e) {
    e.preventDefault()

    this.modalTarget.classList.add('hidden')
    document.querySelector('.desktop-overlay').classList.add('hidden')
    this.dispatch('closed')
  }
}
