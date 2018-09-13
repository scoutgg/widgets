import { Component, Template, Attribute } from '@scoutgg/widgets'

@Component('docs')
@Attribute('name', String, { default: 'zoomIn' })
@Attribute('delay', String, { default: '0s' })
@Attribute('duration', String)
@Attribute('loop', Boolean, { default: false })
@Template(function (html) {
  html `
  <style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css';
    :host {
      display: contents;
    }
    .content {
      display: var(--animate-css-content-display, block);
    }
  </style>
  <div class=${this.classes} style=${this.delayStyle}>
    <slot></slot>
  </div>
  `
})
export default class Animate extends HTMLElement {
  get delayStyle() {
    let styles = `animation-delay:${this.delay};`
    if(this.duration) styles += `animation-duration:${this.duration};`
    return styles
  }
  get classes() {
    const infinite = this.loop ? 'infinite' : ''
    return `animated ${this.name} ${infinite}`
  }
}
