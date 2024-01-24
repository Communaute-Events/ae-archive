import { events, app, window } from "@neutralinojs/lib";

events.on("windowClose", ()=>{
    app.exit(1)
})