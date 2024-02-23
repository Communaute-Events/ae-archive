import { filesystem, os } from "@neutralinojs/lib"

export async function install() {
    switch (window.NL_OS) {
        case "Darwin": await darwin(); break;
        default: os.showMessageBox(`Erreur (URL Scheme Installer)`, `Votre OS (${window.NL_OS}) n'est pas supportée. En cas de problème, ne créez pas d'issues sur GitHub. Pour obtenir de l'aide rejoignez notre serveur discord sur https://commu.events/discord.`, os.MessageBoxChoice.OK, os.Icon.WARNING)
    }
}

export async function getUrlData(): Promise<string | undefined> {
    switch (window.NL_OS) {
        case "Darwin":
            const dataArg = window.NL_ARGS.find(arg => arg.startsWith("--data="))
            if(!dataArg) return;
            return decodeURIComponent(dataArg.split("=")[1].slice(1, -1)).replace("autoevent://", "") || undefined;
    }
}

async function darwin() {

    console.log("Installing URL Scheme for Darwin")
    function encodePath(path: string) {
        return path.replace(/\s/g, "\\ ")
    }

    async function pathExists(path: string) {
        try {
            await filesystem.getStats(path)
            return [true, undefined]
        } catch (err) {
            return [false, err as any]
        }
    }

    const userPath = (await os.execCommand('cd && pwd')).stdOut.replace("\n", "")
    const appSupportPath = `${userPath}/Library/Application Support/AutoEvent`

    // Checks for application support folder
    let [exists, err] = await pathExists(appSupportPath)
    if (!exists && err.code === "NE_FS_NOPATHE") {
        await filesystem.createDirectory(appSupportPath)
    }
    // Check for url-scheme handler and download
    [exists, err] = await pathExists(`${appSupportPath}/url-handler.app`)
    if (!exists && err.code === "NE_FS_NOPATHE") {
        console.log("Installing URL Handler")
        try {
            await os.execCommand(`curl "https://raw.githubusercontent.com/Communaute-Events/artifacts/main/autoevent/macos/url-handler.app.zip" > ${encodePath(appSupportPath)}/url-handler.app.zip`)
            await os.execCommand(`unzip -d ${encodePath(appSupportPath)} ${encodePath(appSupportPath)}/url-handler.app.zip`)
            await os.execCommand(`${encodePath(appSupportPath)}/url-handler.app/Contents/MacOS/applet`)
            await filesystem.remove(appSupportPath + "/url-handler.app.zip")
        } catch (err) {
            console.error(err)
        }
    }
}