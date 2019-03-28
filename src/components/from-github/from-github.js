import { Component, Template, Attribute } from '@scoutgg/widgets'
import '../markdown/markdown'
import '../github-menu/github-menu'

@Component('docs')
@Attribute('slug', String)
@Template(function (html) {
  html `
<style>
  :host {
    display: flex;
  }
  docs-github-menu {
    min-width: 340px;
    margin-right: 1em;
  }
  docs-markdown {
    width: 100%;
    max-width: 1000px;
    flex: 1;
  }
  @media only screen and (max-width: 600px) {
    :host {
      flex-direction: column;
    }
    docs-github-menu {
      min-height: unset;
      align-items: flex-start;
      width: 100vw;
      border-right: 0;
      border-bottom: 1px solid #c3dde6;
    }
  }
</style>
<docs-github-menu></docs-github-menu>
<docs-markdown>${{html: this.markdown}}</docs-markdown>
  `
})
export default class FromGithub extends HTMLElement {
  async connectedCallback() {
    // Load the markdown file from github based on slug from the URL param.
    const response = await fetch(`https://cdn.rawgit.com/scoutgg/widgets-docs/master/${this.slug}.md`)
    this.markdown = await response.text()
    this.render()
  }
}
