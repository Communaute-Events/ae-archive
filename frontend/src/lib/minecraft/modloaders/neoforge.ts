import { os } from '@neutralinojs/lib';

export async function getNeoforgeData() {
	// Using curl to get around the CORS policy
	const res = (
		await os.execCommand(
			`curl -X GET -H "Content-Type: application/xml" https://maven.neoforged.net/releases/net/neoforged/neoforge/maven-metadata.xml`,
		)
	).stdOut;
	// fxparser was imported in the index.html file
	const parser = new fxparser.XMLParser()
	const data = parser.parse(res)
	console.log(data)
}