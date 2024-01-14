import { bindKeyCombo } from "@rwh/keystrokes"
import { clipboard, app } from "@neutralinojs/lib"

window.addEventListener('keydown', (event) => {
    switch (window.NL_OS) {
        case "Darwin":
            const wasCommandUsed = event.metaKey === true
            if (wasCommandUsed) {
                event.preventDefault()
                switch (event.which) {
                    case 81: // q
                    case 87: // w
                        return app.exit()
                    case 86: // v
                        return document.execCommand('paste')
                    case 65: // a - select all
                        return document.execCommand('selectAll', false);
                    case 67: // c
                        return document.execCommand('copy')
                    case 88: // x
                        return document.execCommand('cut')
                    case 82: // r - refresh
                        return location.reload()
                }
            }
    }

})