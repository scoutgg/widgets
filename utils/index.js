export function emit(Class) {
  Object.assign(Class.prototype, {
    emit(eventName, data) {
      let event = new CustomEvent(eventName)
      event = Object.assign(event, data)
      this.dispatchEvent(event)
    }
  })
}
