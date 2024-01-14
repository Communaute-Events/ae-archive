import './app.css'
import "./lib/keystrokes"
import App from './App.svelte'
import { init } from '@neutralinojs/lib'

init()


const app = new App({
  target: document.getElementById('app'),
})

export default app
