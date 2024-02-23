import spawn from '@expo/spawn-async';
import path from 'path';
import { existsSync, chmodSync } from 'fs';

async function main() {
	// Clear terminal
	process.stdout.write('\x1b[2J')
	process.stdout.write('\x1b[0f');

	// Get the correct binary name
	let binaryOS = 'linux';
	switch (process.platform) {
		case 'darwin':
			binaryOS = 'mac';
			break;
		case 'win32':
			binaryOS = 'win';
			break;
		default:
			break;
	}
	// Start the vite dev server
	const vite = spawn('vite', ["dev"], {
		cwd: process.cwd(),
		detached: false,
		stdio: 'inherit',
	});
	const args = [
		'--window-enable-inspector=true',
		'--export-auth-info',
		'--load-dir-res',
		`--path=${path.resolve('.')}`,
		'--neu-dev-extension',
		'--url=http://localhost:5173',
	];
	// Chmod +x the binary to be able to run it
	chmodSync(path.resolve(`./bin/neutralino-${binaryOS}_${process.arch}`), '755');
	await spawn(`./bin/neutralino-${binaryOS}_${process.arch}`, args, {
		cwd: process.cwd(),
		detached: false,
		stdio: 'inherit',
	}).child.on('close', () => {
		vite.child.kill();
		process.exit();
	});
}

// If the binary folder doesn't exist, then we download it
if (!existsSync(path.resolve('./bin'))) {
	spawn('npx', ['neu', 'update'], {
		cwd: process.cwd(),
		detached: false,
		stdio: 'inherit',
	}).child.on('exit', main);
} else {
	main();
}
