import "../../app.pcss"
import "../../lib/app"
import App from './App.svelte'
import { init, events, os } from '@neutralinojs/lib'
import { install, getUrlData } from '../../lib/modules/url'

init()
events.on("ready", async () => {
  console.log("Neutralino is ready!")
  // URl Scheme
  await install().catch(console.error)
  await getUrlData().then(data => {
    if (data) {
      window.DATA = data
    }
  }).catch(console.error)

})

const app = new App({
  // @ts-expect-error
  target: document.getElementById('app'),
})

export default app