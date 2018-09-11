import { Component, Template } from '@scoutgg/widgets'
import capitalize from 'lodash/capitalize'
import lowerCase from 'lodash/lowerCase'
import config from '../../config'

@Component('demo')
@Template(function (html) {
  html `
    <style>
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      li {
        margin: .5em 0;
      }
    </style>
    <ul>
      ${(this.pages || []).map((page)=> {
        return `<li><a href="${config.basePath || ''}/docs/${page}">${capitalize(lowerCase(page))}</a></li>`
      })}
    </ul>
  `
})
export default class GithubMenu extends HTMLElement {
  async connectedCallback() {
    let pages = await fetch('https://api.github.com/repos/scoutgg/widgets-docs/git/trees/master')
    pages = await pages.json()
    this.pages = pages.tree
      .map(file=>file.path)
      .filter(file=>file.includes('.md') && file !== 'README.md')
      .map(file=> file.slice(0, file.indexOf('.md')))
    this.render()
  }
}
