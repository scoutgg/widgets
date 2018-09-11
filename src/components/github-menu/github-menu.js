import { Component, Template } from '@scoutgg/widgets'
import capitalize from 'lodash/capitalize'
import lowerCase from 'lodash/lowerCase'
import config from '../../config'

@Component('demo')
@Template(function (html) {
  html `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-top: 1em;
        background-color: #f3fafc;
        border-right: 1px solid #c3dde6;
        color: var(--accent-color-text);
        padding: 1em;
        box-sizing: border-box;
        min-height: calc(100vh - 53px);
      }
      h1 {
        font-size: 1.5em;
        font-family: var(--accent-font);
        color: var(--accent-color-1);
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      li {
        margin: .5em 0;
        font-size: .9em;
      }
      a {
        text-decoration: none;
        color: var(--accent-color-2);
        font-weight: 500;
      }
    </style>
    <h1>docs</h1>
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
      .map(file=> {
        file = file.slice(0, file.indexOf('.md'))
        if(!isNaN(file[0])) file = file.slice(file.indexOf('-'), file.length)
        return file
      })
    this.render()
  }
}
