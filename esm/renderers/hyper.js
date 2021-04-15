
import renderer from './html.js'

export default hyper

export function hyper({ bind }, html) { 
  return renderer({
    lib(node) {
      if(!node.html) {
        node.html = bind(node.shadowRoot || node)
      }
      return html || node.html
    },
    render(template) {
      return this.html`${template}`
    }
  })
}
