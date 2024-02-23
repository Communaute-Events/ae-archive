import { os } from "@neutralinojs/lib";
import type { MinecraftVersion } from "../data";

export interface FabricVersion {
    loader:       Loader;
    intermediary: Intermediary;
    launcherMeta: LauncherMeta;
}

export interface Intermediary {
    maven:   Maven;
    version: MinecraftVersion;
    stable:  boolean;
}

export enum Maven {
    NetFabricmcIntermediary1182 = "net.fabricmc:intermediary:1.18.2",
}

export interface LauncherMeta {
    version:         number;
    minJavaVersion?: number;
    libraries:       Arguments;
    mainClass:       MainClassClass | MainClassEnum;
    arguments?:      Arguments;
    launchwrapper?:  Launchwrapper;
}

export interface Arguments {
    client:       ClientElement[];
    common:       Common[];
    server:       Array<ServerClass | ServerServerEnum>;
    development?: Common[];
}

export enum ClientElement {
    NetFabricmcLoaderLaunchFabricClientTweaker = "net.fabricmc.loader.launch.FabricClientTweaker",
}

export interface Common {
    name:    string;
    url?:    string;
    md5?:    string;
    sha1?:   string;
    sha256?: string;
    sha512?: string;
    size?:   number;
}

export interface ServerClass {
    comment: string;
    name:    Name;
    url:     string;
}

export enum Name {
    COMGoogleGuavaGuava210 = "com.google.guava:guava:21.0",
}

export enum ServerServerEnum {
    NetFabricmcLoaderLaunchFabricServerTweaker = "net.fabricmc.loader.launch.FabricServerTweaker",
}

export interface Launchwrapper {
    tweakers: Arguments;
}

export interface MainClassClass {
    client: MainClassClient;
    server: MainClassServer;
}

export enum MainClassClient {
    NetFabricmcLoaderImplLaunchKnotKnotClient = "net.fabricmc.loader.impl.launch.knot.KnotClient",
    NetFabricmcLoaderLaunchKnotKnotClient = "net.fabricmc.loader.launch.knot.KnotClient",
}

export enum MainClassServer {
    NetFabricmcLoaderImplLaunchKnotKnotServer = "net.fabricmc.loader.impl.launch.knot.KnotServer",
    NetFabricmcLoaderLaunchKnotKnotServer = "net.fabricmc.loader.launch.knot.KnotServer",
}

export enum MainClassEnum {
    NetMinecraftLaunchwrapperLaunch = "net.minecraft.launchwrapper.Launch",
}

export interface Loader {
    separator: Separator;
    build:     number;
    maven:     string;
    version:   string;
    stable:    boolean;
}

export enum Separator {
    Build = "+build.",
    Empty = ".",
}

export async function getFabricData(minecraftVersion: MinecraftVersion): Promise<FabricVersion[]> {
    const req: FabricVersion[] = JSON.parse(await (await os.execCommand(`curl -X GET -H "Content-Type: application/json" https://meta.fabricmc.net/v2/versions/loader/${minecraftVersion}`)).stdOut)
    return req;
}