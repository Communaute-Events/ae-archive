import { os, window as w } from "@neutralinojs/lib"
import LibPaths from "../lib-paths";
import { getMode } from "./env";
import { focusWindow } from "./window";
import terminal from "virtual:terminal";

const mode = getMode()

export interface NotificationOptions {
    title: string,
    content: string,
    id: string,
    sound?: boolean,
    timeout?: number,
    type?: os.Icon,
}

export async function showNotification(options: NotificationOptions) {
    try {
        switch (window.NL_OS) {
            case "Darwin":
                await darwin(options);
                break;
            case "Windows":
                // etc...
                break;
            case "Linux":
                // etc..
                break;
            default:
                await os.showNotification(options.title,options.content,(options.type || os.Icon.INFO))
                break;
        }
    } catch (err) {
        console.error(err)
    }
}

async function darwin(options: NotificationOptions) {
    try {
        const alerter = LibPaths.notifications.darwin[mode]
        os.execCommand(`${alerter} -message "${options.content}" -title "${options.title}" -group "${options.id}" -sender "AutoEvent" ${options.timeout ? '-timeout ' + Math.floor(options.timeout) : ''} ${options.sound ? '-sound default' : ''}`).then(cmd => {
            if (cmd.stdOut === "@ACTIONCLICKED") {
                focusWindow()
            }
        })
    } catch (err) {
        console.error(err)
    }
}