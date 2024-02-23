import { filesystem, os, } from "@neutralinojs/lib";

export async function autoStart(operation = true) {
    switch (window.NL_OS) {
        case "Darwin": darwin(operation); break;
        default:
            os.showMessageBox("Autostarting Error",`Votre OS (${window.NL_OS}) ne supporte (pas encore) le lancement automatique du programme à l'ouverture de la session. N'hésitez pas à nous aider à implémenter cette fonction sur votre OS en rejoignant notre Discord sur "commu.events/discord".`,os.MessageBoxChoice.OK,os.Icon.WARNING);
            break;
    }
}

async function darwin(operation: boolean) {
    try {
        if (operation) {
            await os.execCommand(`osascript -e 'tell application "System Events" to make login item at end with properties {name: "AutoEvent",path:"/Applications/AutoEvent.app", hidden:false}'`)
        } else {
            await os.execCommand(`osascript -e 'tell application "System Events" to delete login item "AutoEvent"'`)
        }
    } catch (err) {
        console.error(err)
    }
}