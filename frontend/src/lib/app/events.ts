import { events, app } from "@neutralinojs/lib";

events.on("windowClose", ()=>{
    app.exit(0)
})