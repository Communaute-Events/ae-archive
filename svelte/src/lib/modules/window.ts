import { app, os } from "@neutralinojs/lib";
import { getMode } from "./env";

export async function focusWindow() {
    try {
        switch (window.NL_OS) {
            case "Darwin":
                await darwin();
                break;
        }
    } catch (err) {
        console.error(err)
    }
}

async function darwin() {
    try {
        if (getMode() === "dev") {
            // So the app can be focused in dev environnement
            os.execCommand(`osascript -e 'tell application "System Events" to set frontmost of every process whose unix id is ${window.NL_PID} to true'`)
        } else {
            // Better way of focusing the app
            os.execCommand(`open -a "AutoEvent"`)
        }
    } catch (err) {
        console.error(err)
    }
}