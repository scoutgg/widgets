import Hello from '../components/hello/hello'
import About from '../components/about/about'
import FromGithub from '../components/from-github/from-github'

module.exports = {
  '/': {
    component: Hello,
    parentClass: 'full-size',
  },
  '/home/:name?': {
    component: Hello,
    parentClass: 'full-size',
  },
  '/about': About,
  '/docs/:slug': FromGithub,
}
