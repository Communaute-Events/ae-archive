import type { MinecraftVersion } from "../data";
import { os } from "@neutralinojs/lib";

export interface ForgeVersion {
    id:        string;
    build:     number;
    v:         number;
    version:   string;
    modified:  Date;
    mcversion: MinecraftVersion;
    files:     File[];
    branch:    null | string;
}

export interface File {
    format:   Format;
    category: Category;
    hash:     string;
}

export enum Category {
    Changelog = "changelog",
    Installer = "installer",
    Mdk = "mdk",
    Universal = "universal",
}

export enum Format {
    Jar = "jar",
    Txt = "txt",
    Zip = "zip",
}

export async function getForgeData(minecraftVersion: MinecraftVersion): Promise<ForgeVersion[]> {
    const req: ForgeVersion[] = JSON.parse(await (await os.execCommand(`curl -X GET -H "Content-Type: application/json" https://bmclapi2.bangbang93.com/forge/minecraft/${minecraftVersion}`)).stdOut)
    return req;
}