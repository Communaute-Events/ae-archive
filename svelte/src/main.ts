import './app.css'
import "./lib/app/"
import App from './App.svelte'
import { init, events, os } from '@neutralinojs/lib'
import { install, getUrlData } from './lib/modules/url'
import terminal from 'virtual:terminal'

init()
events.on("ready",()=>{
  console.log("Neutralino is ready!")
  install().then(()=>{
    getUrlData().then(data => {
      if (data) {
        window.DATA = data
      }
    }).catch(console.error)
  }).catch(console.error)
})

const app = new App({
  // @ts-expect-error
  target: document.getElementById('app'),
})

export default app