import { Component, Template } from '@scoutgg/widgets'

@Component('docs')
@Template(function (html) {
  html `
    <h1>☕Fresh new component «about»</h1>
  `
})
export default class About extends HTMLElement {
}
