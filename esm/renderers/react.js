
import renderer from './html.js'

export default react

export function react(ReactDOM, html = ReactDOM.createElement || ReactDOM.html) {
  return renderer({ html, render: ReactDOM.render })
}