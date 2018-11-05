export default function Input(property) {
  const prop = Symbol.for(property)
  return function define(Class) {
    Object.defineProperty(Class.prototype, property, {
      configurable: true,
      get() {
        return this[prop]
      },
      set(value) {
        console.log('setting', value)
        if(this[prop] !== value) this.render(this[prop] = value)
      },
    })
  }
}
