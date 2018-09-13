import { Component, Template, Attribute } from '@scoutgg/widgets'

@Component('docs')
@Template(function (html) {
  html `
    <style>
      docs-page-router {
        max-width: 1024px;
        display: block;
        margin: 0 auto;
      }
      docs-page-router.full-size {
        max-width: none !important;
      }
    </style>
    <docs-navigation current-route=${this.route} />
    <docs-page-router onrouteChanged=${e => this.routeChanged(e)} />
  `
})
export default class App extends HTMLElement {
  routeChanged({ context }) {
    this.route = context.pathname
    this.render()
  }
}
