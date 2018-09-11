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

      }
      .splash {
        background-image: url(public/milkyway.jpg);
        background-size: cover;
        background-position: center center;
        height: 70vh;
        color: var(--primary-color-text);
      }
      .usp {
        flex-direction: row;
        justify-content: space-around;
      }
      .box {
        width: 15%;
        min-width: 150px;
        text-align: center;
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
    <section class="splash">
      <h2>Introducing</h2>
      <h1>Widgets</h1>
      <h5>A small front-end library by Scout Gaming Group</h5>
      <a class="btn" href="https://www.github.com/scoutgg/widgets">
        Fork on Github!<fa-icon category="fab" name="github" />
      </a>
    </section>
    <section class="usp">
      <div class="box">
        <demo-icon name="project-diagram" />
        <h2>Components</h2>
        <p>
          Widgets is a library connecting templating language with syntactical
          sugar for using Web Components.
        </p>
      </div>

      <div class="box">
        <demo-icon name="server" />
        <h2>Production ready</h2>
        <p>
          Widgets is a production ready library used by Scout Gaming Group
          and our clients. Easily create components libraries to suite your
          personal og business needs.
        </p>
      </div>

      <div class="box">
        <demo-icon name="code" />
        <h2>Less configuration!</h2>
        <p>
          With widgets you get simple boiler plates and tools to save time
          configuring complex build tools and start focusing on your code
          and getting things done again.
        </p>
      </div>
    </section>
  `
})
export default class Hello extends HTMLElement {
}
