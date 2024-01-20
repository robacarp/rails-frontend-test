import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["indexOutput"]

  reindexOutputs() {
    this.indexOutputTargets.forEach((target, i) => {
      target.value = i + 1
    })
  }
}
