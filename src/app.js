import { Component, Template, Attribute } from '@scoutgg/widgets'

@Component('demo')
@Template(function (html) {
  html `
    <style>
      demo-page-router {
        max-width: 1024px;
        display: block;
        margin: 0 auto;
      }
      demo-page-router.full-size {
        max-width: none !important;
      }
    </style>
    <demo-navigation current-route=${this.route} />
    <demo-page-router onrouteChanged=${e => this.routeChanged(e)} />
  `
})
export default class App extends HTMLElement {
  routeChanged({ context }) {
    this.route = context.pathname
    this.render()
  }
}
