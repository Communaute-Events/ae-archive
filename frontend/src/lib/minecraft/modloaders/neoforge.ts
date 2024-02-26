import { debug, os, clipboard } from '@neutralinojs/lib';
import { XMLParser } from 'fast-xml-parser';
import type { MinecraftVersion } from '../data';

export interface NeoforgeXML {
    xml:      string;
    metadata: Metadata;
}

export interface Metadata {
    groupID:    string;
    artifactID: string;
    versioning: Versioning;
}

export interface Versioning {
    latest:      string;
    release:     string;
    versions:    Versions;
    lastUpdated: number;
}

export interface Versions {
    version: string[];
}


export async function getNeoforgeData(minecraftVersion: MinecraftVersion, beta = false): Promise<string[]> {
	try {
		// Using curl to get around the CORS policy
		const res = (
			await os.execCommand(
				`curl -X GET -H "Content-Type: application/xml" https://maven.neoforged.net/releases/net/neoforged/neoforge/maven-metadata.xml`,
			)
		).stdOut;
		// Use fast-xml-parser to convert the xml to JSON
		const parser = new XMLParser();
		const data: NeoforgeXML = parser.parse(res);
		let versions = data.metadata.versioning.versions.version.filter(v => v.startsWith(minecraftVersion.replace("1.","")))
		if (!beta) {
			versions = versions.filter(v => !(v.endsWith("-beta")))
		}
		if (versions.length < 1) {
			return []
		}
		return versions
		
	} catch (err) {
		console.error(err);
		return []
	}
}
