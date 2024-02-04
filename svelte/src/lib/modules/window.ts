import { app, os } from "@neutralinojs/lib";

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
        os.execCommand(`osascript -e 'tell application "System Events" to set frontmost of every process whose unix id is ${window.NL_PID} to true'`)
    } catch (err) {
        console.error(err)
    }
}