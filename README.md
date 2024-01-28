<div align="center">
    <img src=".github/assets/logo.png" style="width:30%;">
</div>

---

# AutoEvent

AutoEvent is a lightweight and blazing fast event launcher built with [Neutralino](https://neutralino.js.org) and [Svelte](https://svelte.dev). It is currently in construction.

## Building

(Note: If you're on Windows, you must install WSL)

Install Jq
```shell
# On macOS:
brew install jq
# On Linux or Windows/WSL:
sudo apt-get install jq
```

Clone the repo
```shell
git clone https://github.com/Communaute-Events/AutoEvent.git
```

Install the neu-cli
```shell
npm install -g @neutralinojs/neu
```

Run the build script for your target OS
```shell
# MacOS
./build mac
# Linux
./build linux
# Windows
./build win
```

## Beta Builds

To download the buit-on-commit builds (nightly), go to this link: https://nightly.link/Communaute-Events/AutoEvent/workflows/build/main?preview
