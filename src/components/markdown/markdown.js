import { Component, Template, Attribute } from '@scoutgg/widgets'
import MarkdownIt from 'markdown-it'
import highlightjs from 'highlightjs'
import { wire } from 'hyperhtml'

@Component('docs')
@Attribute('md', String)
@Template(function (html) {
  html `
    <style>
      @import 'https://rawgit.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css';
      @import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/atom-one-dark.min.css';
      img {
        border-radius: 0;
        height: auto !important;
        margin: 0 auto;
        max-height: 400px;
      }
    </style>
    ${ { html: this.parsedMarkdown } }
  `
})
export default class Markdown extends HTMLElement {
  connectedCallback() {
    // Magic 3rd party markdown plugin
    this.markdownIt = new MarkdownIt()
    this.observer = new MutationObserver(changes => {
      // Tell hyperhtml(current render engine) to re-render.
      this.render(()=> {
        // After render is complete, execute code highlighting which is a second
        // 3rd party plugin.
        Array.from(this.shadowRoot.querySelectorAll('pre code'))
          .forEach((element) => {
            highlightjs.highlightBlock(element)
          })
      })
    })
      // Tell MutationObserver to do childList, characterData
      .observe(this, { childList: true, characterData: true })
  }
  get parsedMarkdown() {
    return this.markdownIt.render(this.textContent)
  }
}
