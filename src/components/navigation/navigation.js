import { Component, Template, Attribute } from '@scoutgg/widgets'
import { wire } from 'hyperhtml'
import page from 'page'
import config from '../../config'

@Component('docs')
@Attribute('currentRoute', String)
@Template(function (html) {
  html `
    <style>
      nav {
        display: flex;
        align-items: center;
        padding: 0 1em;
        height: 80px;
        background-color: var(--primary-color-1, yellow);
        max-width: 100vh;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
      a {
        color: #fff;
        margin-right: 1em;
        text-decoration: underline;
        text-decoration-color: transparent;
        border-bottom: 2px solid transparent;
      }
      .logo, img {
        max-height: 50px;
        margin-right: 1em;
      }
      .active {
        border-color: var(--accent-color-1);
      }
    </style>
    <nav>
      <div class="logo">
        <a href="https://www.scoutgaminggroup.com" target="_blank">
          <img src="public/sgg-logo.png" />
        </a>
      </div>
      ${this.routes.map((route)=> {
        return wire()`
          <a  class=${this.isCurrent(route)} href="${route[1]}">${route[0]}</a>
        `
      })}
    </nav>
  `
})
export default class Navigation extends HTMLElement {
  connectedCallback() {
    this.routes = [
      ['Hello!', `${config.basePath || ''}/`],
      ['Documentation', `${config.basePath || ''}/docs/0-introduction`],
      ['About', `${config.basePath || ''}/about`],
    ]
    this.render()
  }
  route(path) {
    page(path)
  }
  isCurrent(route) {
    return route[1] === this.currentRoute ? 'active menu-link' : 'menu-link'
  }
}
