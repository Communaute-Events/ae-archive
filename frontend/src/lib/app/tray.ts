import { os, events, window as w, app, storage } from "@neutralinojs/lib";
import { getMode } from "../modules/env";
import { autoStart } from "../modules/launch";

interface TrayMenuItem {
    id?: string;
    text?: string;
    isDisabled?: boolean;
    isChecked?: boolean;
}

let tray: TrayMenuItem[] = [];

const mode = getMode()
console.log("Environment: " + mode)

export async function updateTray(updatedItems: TrayMenuItem[]) {

    const updatedTray = [...tray];

    updatedItems.forEach(updatedItem => {
        const index = updatedTray.findIndex(item => item.id === updatedItem.id);

        if (index !== -1) {
            updatedTray[index] = {
                ...updatedTray[index],
                ...updatedItem
            };
        } else {
            updatedTray.push(updatedItem)
        }
    });

    tray = updatedTray

    await os.setTray({ icon: mode === 'dev' ? '/svelte/public/tray.png' : '/svelte/dist/tray.png', menuItems: tray as os.TrayMenuItem[] })
}

export async function removeTray(trayIds: string[]) {
    tray = tray.filter(item => !trayIds.includes(item.id || ""))
}

(async () => {
    if (window.NL_MODE != "window") {
        console.log("INFO: Tray menu is only available in the window mode.");
        return;
    }

    let autoStarting = await storage.getData("autoStart").catch(console.error) === "true";

    await updateTray([
        { id: "windowState", isChecked: await w.isVisible(), text: "Afficher la fenêtre" },
        { id: "autoStart", isChecked: autoStarting, text: "Lancer dès l'ouverture de session" },
        { id: "quit", text: "Quitter" }
    ])

    events.on("trayMenuItemClicked", async (e) => {
        switch (e.detail.id) {
            case "windowState":
                if (await w.isVisible()) {
                    w.hide()
                } else {
                    w.show()
                }
                updateTray([{
                    id: "windowState",
                    isChecked: await w.isVisible()
                }])
                break;
            case "autoStart":
                autoStart(!autoStarting)
                autoStarting = !autoStarting
                storage.setData("autoStart",String(autoStarting))
                updateTray([{
                    id: "autoStart",
                    isChecked: autoStarting
                }])
                break;
            case "quit":
                app.exit(0)
        }
    })
})();