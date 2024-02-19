<div align="center">
    <img src=".github/assets/logo.png" style="width:30%;">
</div>

---

# AutoEvent

AutoEvent is a lightweight and blazing fast event launcher built with [Neutralino](https://neutralino.js.org) and [Svelte](https://svelte.dev). It is currently in construction.

## Features

AutoEvent can notify you of upcoming events, while consumming close to no ram while running in the background. Clicking the alert will directly take you the the launch steps.

<figure>
  <img
  src=".github/assets/notif.png"
  alt="Image of what the notifications look like" style="width:50%;">
  <figcaption>Image of what the notifications look like</figcaption>
</figure>

## Roadmap

Currently, a lot of features aren't present on certain platforms (ex: notifications and app focus don't work on linux and windows). This is due to the fact that the main dev (OrigamingWasTaken) is on MacOS, and can't develop for other OSes. So you are very welcome to help us implement the missing features!

### Curated list of need-to-implement features

**Mac**
- [x] Notifications
- [x] Alerts
- [x] Window functions
- [x] Autostarting
- [x] URL Scheme

**Windows**
- [ ] Notifications
- [ ] Alerts
- [ ] Window functions
- [ ] Autostarting
- [ ] URL Scheme

**Linux**
- [ ] Notifications
- [ ] Alerts
- [ ] Window functions
- [ ] Autostarting
- [ ] URL Scheme

## Nightly Builds

You can download the app from the [nightly builds](https://nightly.link/Communaute-Events/AutoEvent/workflows/build/main?preview)

## Building

(Note: If you're on Windows, you must install WSL: [see guide below](https://github.com/Communaute-Events/AutoEvent#windows))

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
# All platforms
./build all
```

### Windows

#### Install WSL

To install WSL, or Windows Subsystem for Linux, open Powershell/Command prompt in **administrator** mode and enter the command:
```shell
wsl --install
```
###### [*[more info]*](https://learn.microsoft.com/en-us/windows/wsl/install)

Now, open an Ubuntu console which will request you to create your user account.

Before going further, update the packages and add wget (retrieve content from web servers) and ca-certificates (allow SSL-based applications to check for the authenticity of SSL connections):
```shell
sudo apt update && sudo apt upgrade
sudo apt-get install wget ca-certificates
```
###### [*[more info]*](https://learn.microsoft.com/en-us/windows/wsl/setup/environment#set-up-your-linux-username-and-password)

#### VS Code Development Environment
Install the [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) which includes the WSL extension (or only install the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)).

To open a WSL project:
- **from the command line**: open the Ubuntu console, type `code .`
- **from VS Code**: type `WSL` in the command palette (`Ctrl+Shift+P`) to see available options.

#### Install Node.js
The most stable way is to use [NVM](https://github.com/nvm-sh/nvm), or Node Version Manager.

Install NVM:
```shell
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Now restart WSL or type the following command:
```shell
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

If it's installed:
```shell
$ nvm --version # returns version
$ nvm ls
iojs -> N/A (default)
node -> stable (-> N/A) (default)
unstable -> N/A (default)
```

Now install the LTS versions of Node.js:
```shell
nvm install --lts
```

...if it's installed:
```shell
node --version
npm --version
```

[*[more info]*](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)



Now you can install Jq, the neu-cli and clone the repo using the commands stated [above](https://github.com/Communaute-Events/AutoEvent#building).