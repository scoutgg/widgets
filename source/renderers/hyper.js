import { mixin } from '../utils'


export function hyper({ bind }) {
  return function renderer(Class) {
    mixin(Class.prototype, {
      attributeChangedCallback(args, next) {
        this.render()
        return next()
      },
      connectedCallback(args, next) {
        if(this.html) return next()

        this.attachShadow({ mode: 'open' })
        this.html = bind(this.shadowRoot)

        this.render()

        return next()
      },
      render(args, next) {
        this.template(this.html)

        return next()
      }
    })
  }
}
