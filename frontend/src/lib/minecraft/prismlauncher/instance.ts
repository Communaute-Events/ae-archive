import type { MinecraftVersion } from '../data';
import { getForgeData } from '../modloaders/forge';
import { getFabricData } from '../modloaders/fabric';
import { debug } from '@neutralinojs/lib';
import { getNeoforgeData } from '../modloaders/neoforge';

export interface InstanceBuilderConfig {
	modloader: {
		type: 'vanilla' | 'fabric' | 'forge' | 'neoforge';
		version?: string;
	};
	version: MinecraftVersion;
}

export interface InstanceBuilderOpts {
	path: string;
	name: string;
	icon: string;
	config: InstanceBuilderConfig;
}

export class InstanceBuilder {
	public readonly path: string;
	public readonly name: string;
	public readonly icon: string;
	public readonly config: InstanceBuilderConfig;

	constructor(options: InstanceBuilderOpts) {
		const { path, name, icon, config } = options;
		this.path = path;
		this.name = name;
		this.icon = icon;
		this.config = config;
	}

	public async setForgeVersion(): Promise<void> {
		if (this.config.modloader.version) return;
		try {
			const forgeData = await getForgeData(this.config.version);

			if (forgeData.length > 0) {
				const latestForgeVersion = forgeData.reduce((max, current) => (current.build > max.build ? current : max));
				this.config.modloader.version = latestForgeVersion.version;
				console.log(latestForgeVersion.version);
			} else {
				throw new Error(`No Forge versions found for Minecraft version ${this.config.version}`);
			}
		} catch (error: any) {
			debug.log(`Error setting Forge version: ${error.message}`);
			throw error;
		}
	}

	public async setFabricVersion(): Promise<void> {
		if (this.config.modloader.version) return;
		try {
			const fabricData = await getFabricData(this.config.version);
			const stableVersions = fabricData.filter((fd) => fd.loader.stable === true);
			this.config.modloader.version = stableVersions.reduce((max, current) =>
				current.loader.build > max.loader.build ? current : max,
			).loader.version;
		} catch (error) {
			console.log(error);
		}
	}

	public async setNeoforgeVersion(): Promise<void> {
		if (this.config.modloader.version) return;
		try {
			const versions = await getNeoforgeData(this.config.version, true);
			const highestVersion = versions.reduce(
				(highest, current) =>
					highest.localeCompare(current, undefined, { numeric: true, sensitivity: 'base' }) === -1 ? current : highest,
				'',
			);
			if (!highestVersion) {
				throw new Error("No NeoForge version found for '" + this.config.version + "'");
			}
			this.config.modloader.version = highestVersion;
		} catch (error) {
			console.log(error);
		}
	}

	public async initialize(): Promise<void> {
		try {
			switch (this.config.modloader.type) {
				case 'forge':
					await this.setForgeVersion();
					break;
				case 'fabric':
					await this.setFabricVersion();
					break;
				case 'neoforge':
					await this.setNeoforgeVersion();
					break;
				case 'vanilla':
					this.config.modloader.version = this.config.version;
			}
		} catch (err) {
			throw new Error(err as string)
		}
	}

	public async build(): Promise<void> {
		try {
			
		} catch (err) {
			throw new Error(err as string)
		}
	}
}
