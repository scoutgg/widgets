import { Component, Template, Attribute } from '@scoutgg/widgets'
import '../icon/icon'
import '../animate/animate'

@Component('docs')
@Attribute('name', String, { default: 'World' })
@Template(function (html) {
  html `
    <style>
      section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .splash {
        background-image: url(https://s3-eu-west-1.amazonaws.com/jujus-staging/test/norsk.jpg);
        background-size: cover;
        background-position: center center;
        height: 70vh;
        color: var(--primary-color-text);
      }
      .usp {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 1.5em;
        min-height: 50vh;
        align-items: flex-start;
        justify-items: center;
        max-width: 1200px;
        margin: 0 auto;
      }
      .box {
        min-width: 125px;
      }
      .box h2 {
        white-space: nowrap;
        filter: none;
        text-align: center;
        color: var(--accent-color-1);
        font-weight: 500;
      }
      .box .fa-icon {
        color: var(--accent-color-2);
      }
      h1, h2, h3, h4, h5 {
        margin: 0;
        padding: 0;
        font-weight: 300;
        filter: drop-shadow(1px 1px 1px rgba(0,0,0,.6));
      }
      h1 {
        font-size: 8em;
        color: var(--primary-color-text, #fff);
      }
      h5 {
        font-size: 1.5em;
      }
      .btn {
        padding: 1em;
        margin: 1em;
        background-color: var(--secondary-color-1);
        color: var(--secondary-color-text);
        border-radius: 2em;
        font-weight: 500;
        font-size: 1.2em;
        white-space: nowrap;
      }
      a {
        text-decoration: none;
        color: var(--accent-color-text)
      }
      .box fa-icon {
        color: var(--accent-color-2);
        font-size: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        height: 2.5em;
        width: 2.5em;
      }
    </style>
    <section class="splash">
      <h2>Introducing</h2>
      <docs-animate name="fadeIn" delay="300ms" duration="8s">
        <h1>Widgets</h1>
      </docs-animate>
      <h5>A small front-end library by Scout Gaming Group</h5>
      <a class="btn" href="https://www.github.com/scoutgg/widgets">
        Fork on Github!<fa-icon category="fab" name="github" />
      </a>
    </section>
  `
})
export default class Hello extends HTMLElement {
}
