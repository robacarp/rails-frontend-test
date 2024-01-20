import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["placeholder", "dragitem"]

  connect() {
    this.placeholder = null
  }

  dragStart(event) {
    event.dataTransfer.setData("drag-id", event.target.id)
    event.dataTransfer.effectAllowed = "move"
    setTimeout(() => event.target.classList.add('hidden'), 1)
  }

  placeTheHolder(element) {
    if (element === null || element == this.placeholder) {
      return
    }

    if (this.placeholder)
      this.placeholder.remove()

    const placeholder = this.placeholderTarget.content.cloneNode(true)
    placeholder.querySelector('*').classList.add('dragging-placeholder')

    const parent = element.parentNode
    parent.insertBefore(placeholder, element)
    this.placeholder = parent.querySelector('.dragging-placeholder')
  }

  findDragItemAncestor(element) {
    if (! element)
      return null

    if (element == document.body) {
      return null
    }

    if (element.dataset.dragitemDrop === "true")
      return element

    return this.findDragItemAncestor(element.parentNode)
  }

  dragOver(event) {
    if (event.dataTransfer.types.includes("drag-id"))
      event.preventDefault()
  }

  dragEnter(event) {
    if (event.dataTransfer.types.includes("drag-id"))
      event.preventDefault()

    this.placeTheHolder(
      this.findDragItemAncestor(event.target)
    )
  }

  dragDrop(event) {
    if (! this.placeholder) return

    const draggable = document.getElementById(event.dataTransfer.getData("drag-id"))
    if (draggable)
      this.placeholder.parentNode.insertBefore(draggable, this.placeholder)

    this.placeholder.remove()
    this.placeholder = null
  }

  dragEnd(event) {
    event.target.classList.remove('hidden')
    if (this.placeholder)
      this.placeholder.remove()
  }

}
