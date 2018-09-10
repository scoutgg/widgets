import { Component, Template, Attribute } from '@scoutgg/widgets'

@Component('demo')
@Attribute('name', String, { default: 'World' })
@Template(function (html) {
  html `
    <style>
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-image: url(/public/milkyway.jpg);
        background-size: cover;
        background-position: center center;
        height: 70vh;
        color: var(--primary-color-text);
      }
      h1, h2, h3, h4, h5 {
        margin: 0;
        padding: 0;
        color: var(--primary-color-text, #fff);
        font-weight: 300;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,.6));
      }
      h1 {
        font-size: 8em;
        color: var(--accent-color-1);
      }
      h5 {
        font-size: 1.5em;
      }
      .btn {
        display: block;
        padding: 1em;
        margin: 1em;
        background-color: var(--accent-color-1);
        border-radius: 2em;
        font-weight: 500;
        font-size: 1.2em;
      }
      a {
        text-decoration: none;
        color: var(--accent-color-text)
      }
    </style>
    <section>
      <h2>Introducing</h2>
      <h1>Widgets</h1>
      <h5>A small front-end library by Scout Gaming Group</h5>
      <a class="btn" href="https://www.github.com/scoutgg/widgets">
        Fork on Github!<fa-icon category="fab" name="github" />
      </a>
    </section>
  `
})
export default class Hello extends HTMLElement {
}
