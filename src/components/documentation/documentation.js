import { Component, Template } from '@scoutgg/widgets'

@Component('demo')
@Template(function (html) {
  html `
    <h1>☕Fresh new component «documentation»</h1>
  `
})
export default class Documentation extends HTMLElement {
}
