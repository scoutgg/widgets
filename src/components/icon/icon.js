import { Component, Template, Attribute } from '@scoutgg/widgets'

@Component('fa')
@Attribute('name', String)
@Attribute('category', String)
@Template(function (html) {
  html `
    <style>
      @import 'https://use.fontawesome.com/releases/v5.3.1/css/all.css';
    </style>
    <span class=${this.icon}></span>
  `
})
export default class Icon extends HTMLElement {
  get icon() {
    return `${this.category || 'fas'} fa-${this.name}`
  }
}
