import { Component, Template, Attribute } from '@scoutgg/widgets'
import MarkdownIt from 'markdown-it'
import highlightjs from 'highlightjs'
import { wire } from 'hyperhtml'

@Component('demo')
@Attribute('md', String)
@Template(function (html) {
  html `
    <style>
      @import 'https://rawgit.com/markdowncss/air/master/css/air.css';
      @import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css';
    </style>
    ${ { html: this.parsedMarkdown } }
  `
})
export default class Markdown extends HTMLElement {
  connectedCallback() {
    this.markdownIt = new MarkdownIt()
    this.observer = new MutationObserver(changes => {
      this.render(()=> {
        Array.from(this.shadowRoot.querySelectorAll('pre code')).forEach((element) => {
          highlightjs.highlightBlock(element)
        })
      })
    })
      .observe(this, { childList: true, characterData: true })
  }
  get parsedMarkdown() {
    return this.markdownIt.render(this.textContent)
  }
}
