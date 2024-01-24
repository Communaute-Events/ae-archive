import { os, events, window } from "@neutralinojs/lib";
import { terminal } from 'virtual:terminal'

interface TrayMenuItem {
    id?: string;
    text?: string;
    isDisabled?: boolean;
    isChecked?: boolean;
}

let tray: TrayMenuItem[] = [];

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
    await os.setTray({ icon: "/svelte/public/tray.png", menuItems: tray as os.TrayMenuItem[] })
    terminal.log(tray)
}

export async function removeTray(trayIds: string[]) {
    tray = tray.filter(item => !trayIds.includes(item.id || ""))
}

(async () => {
    await updateTray([
        { id: "windowState", isChecked: await window.isVisible(), text: "Afficher la fenêtre" }
    ])

    events.on("trayMenuItemClicked", async (e) => {
        switch (e.detail.id) {
            case "windowState":
                if (await window.isVisible()) {
                    window.hide()
                } else {
                    window.show()
                }
                updateTray([{
                    id: "windowState",
                    isChecked: await window.isVisible()
                }])
        }
    })
})();