import { Component, Template } from '@scoutgg/widgets'

@Component('demo')
@Template(function (html) {
  html `
    <h1>☕Fresh new component «{{ component }}»</h1>
  `
})
export default class {{ className }} extends HTMLElement {
}
