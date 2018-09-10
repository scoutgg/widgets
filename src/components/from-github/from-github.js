import { Component, Template, Attribute } from '@scoutgg/widgets'
import '../markdown/markdown'

@Component('demo')
@Attribute('slug', String)
@Template(function (html) {
  html `
<demo-markdown>${{html: this.markdown}}</demo-markdown>
  `
})
export default class FromGithub extends HTMLElement {
  async connectedCallback() {
    const response = await fetch(`https://cdn.rawgit.com/scoutgg/widgets-docs/master/${this.slug}.md`)
    this.markdown = await response.text()
    this.render()
  }
}
