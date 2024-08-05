# ⚠️ Archived due to inactivity in development and not having the time to continue working on this. A re-write may come.

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

## Building

To contribute, or build the projet from source, clone the repo and use the build scripts:

```bash
git clone https://github.com/Communaute-Events/AutoEvent.git
cd AutoEvent
npm install
```

And then run `npm run build` to build, and `npm run dev` to start a dev server (with hot reloading).

## Contributing

Feel free to submit PRs. If you want to get involved, join us at https://commu.events/discod

## Roadmap

Currently, a lot of features aren't present on certain platforms (ex: notifications and app focus don't work on linux and windows). This is due to the fact that the main dev (OrigamingWasTaken) is on MacOS, and can't develop for other OSes. So you are very welcome to help us implement the missing features!

### Curated list of need-to-implement features

**Mac**
- [x] Notifications
- [x] Alerts
- [x] Window functions
- [x] Autostarting
- [x] URL Scheme (autoevent://)

**Windows**
- [ ] Notifications
- [ ] Alerts
- [ ] Window functions
- [ ] Autostarting
- [ ] URL Scheme (autoevent://)

**Linux**
- [ ] Notifications
- [ ] Alerts
- [ ] Window functions
- [ ] Autostarting
- [ ] URL Scheme (autoevent://)

## Nightly Builds

You can download the app from the [nightly builds](https://nightly.link/Communaute-Events/AutoEvent/workflows/build/main?preview)
