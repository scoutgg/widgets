import { bootstrap } from '@scoutgg/widgets'
import { hyper as renderer } from '@scoutgg/widgets/cjs/renderers/hyper'
import { emit } from '../utils'
import hyper from 'hyperhtml'
import routes from './config/routes'
import page from 'page'

// Import the components you want to use
import './components/icon/icon'
import './components/hello/hello'
import './components/about/about'
import './components/navigation/navigation'
import './components/page-router/page-router'
import './components/from-github/from-github'
import './app'


// Bootstrap Widgets (Start it)
bootstrap([
  emit,
  renderer(hyper),
])
