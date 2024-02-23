# How and Why I refactored the whole project

AutoEvent is an awesome project (in my opinion) but it was getting a little unorganized, and too dependent on bash (or wsl).
So huhh i spent **1 week** coding new cross-platform build and packaging scripts.

Notable changes:
- The `npm run dev` command instead of `neu run`
> Oh boy this was a lot of trouble to implement. I had to write my own neutralino and vite binary launcher, and debug for long hours. This process is better because it does not depend on the global installation of the **neu-cli**, and gives us a lot of possibilites to make the developpement process more convenient (like working `debug.log`, to log to the terminal)

- The `npm run build` command instead of `./build all`
> This was especially hard to implement, because I'm on MacOS and don't have a Windows or Linux machine to test on, so I had to see how others did it (you're welcome to clean up the code). The new build scripts remove the dependence on **WSL / Bash**. Those are also better because they directly install the **Windows version icon file into the exe** (oh boy). Overall, i'm pretty satisfied with the new scripts!

- 😈 The codebase 😈
> Basically I changed the whole project architecture, to remove the double `node_modules` folder (yes, I know, why did I do that in the first place).

Thanks for reading (please contribute lol we are short on Linux and Windows devs)

# 👋