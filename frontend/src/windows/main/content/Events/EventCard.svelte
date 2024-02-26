<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { type Files } from '../../../../../../node_modules/filedrop-svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import * as AlertDialog from '../../../../lib/components/ui/alert-dialog';

	import EventCardSelect from './EventCardSelect.svelte';
	import { isVersionBelow, versions } from '$lib/minecraft/data';
	import Dropzone from '$lib/components/ce/Dropzone.svelte';
	import { toast } from 'svelte-sonner';

	export let name: string;
	export let description: string;
	export let icon: string;

	let choosenLauncher: string | undefined;
	let choosenVersion: string | undefined;
	let choosenModLoader: string | undefined;

	const launchers: { label: string; value: string; icon: string }[] = [
		{ label: 'PrismLauncher', value: 'prism', icon: '/assets/prismlauncher.png' },
		{ label: 'Minecraft Launcher', value: 'minecraft', icon: '/assets/minecraftlauncher.png' },
	];

	const modloaders: { label: string; value: string; icon: string; minVersion: string }[] = [
		{ label: 'Fabric', value: 'fabric', icon: '/assets/fabricmc.png', minVersion: '1.14' },
		{ label: 'NeoForge', value: 'neoforge', icon: '/assets/neoforge.png', minVersion: '1.20.2' },
		{ label: 'Forge', value: 'forge', icon: '/assets/forge.jpg', minVersion: '1.7.2' },
	];

	let dropzoneError: () => void;
	let dropzoneMessage = 'Selectionnez votre archive de mods';
	// Input checks

	function currentModLoaderSupported() {
		if (!choosenVersion || !choosenModLoader) return false;
		switch (choosenModLoader) {
			case 'fabric':
				if (!isVersionBelow(choosenVersion, '1.14')) break;
				return false;
			case 'neoforge':
				if (!isVersionBelow(choosenVersion, '1.20.2')) break;
				return false;
		}
		return true;
	}

	//

	function alertChecks(e: MouseEvent) {
		if (!currentModLoaderSupported()) {
			e.stopImmediatePropagation();
			e.preventDefault();
		}
		if (!choosenVersion) return;
		if (!currentModLoaderSupported()) {
			const modloader = modloaders.find((ml) => ml.value === choosenModLoader);
			toast.error(`${modloader?.label} ne supporte pas la version "${choosenVersion}" (${modloader?.minVersion}+)`);
		}
	}

	let fileInfo: { path: string | undefined; file: File | undefined } = {
		path: undefined,
		file: undefined,
	};
	function handleDropzone(e: CustomEvent<Files | string>) {
		// Unsported warning
		switch (window.NL_OS) {
			case 'Windows':
			case 'Linux':
				toast.error(`Votre OS (${window.NL_OS}) ne supporte pas encore l'upload de fichiers.`);
				return;
		}

		switch (e.type) {
			case 'filedrop':
				const event = e as CustomEvent<Files>;
				if (event.detail.accepted.length < 1) {
					toast.error(`Le fichier donné (${event.detail.rejected[0].file.name}) n'est pas une archive (.zip, .rar, .7z)`);
					dropzoneError();
					return;
				} else if (event.detail.accepted.length > 1) {
					toast.error('Seulement 1 fichier peut être utilisé.');
					dropzoneError();
				}
				fileInfo.file = event.detail.accepted[0];
				break;
			case 'fileselected':
				fileInfo.path = (e as CustomEvent<string>).detail;
				break;
			default:
				toast.error('Une erreur est survenue lors du traitement de vos fichiers (FILEPATH_NOT_FOUND)');
				return;
		}
		if (!fileInfo.file && !fileInfo.path) {
			toast.error('Une erreur est survenue lors du traitement de vos fichiers (FILEINFO_NOT_FOUND)');
			return;
		}
		dropzoneMessage = fileInfo.file ? fileInfo.file.name : fileInfo.path || 'file_path_not_found';

		// TODO: Pass the filepath etc to the minecraft launch script
	}
</script>

<div class={$$props.class}>
	<Dialog.Root>
		<Dialog.Trigger
			class="w-full"
			on:click={() => {
				choosenLauncher = undefined;
				choosenVersion = undefined;
				choosenModLoader = undefined;
				fileInfo.file = undefined;
				fileInfo.path = undefined;
				dropzoneMessage = 'Selectionnez votre archive de mods';
			}}
			><Card.Root
				class="w-full cursor-pointer text-left duration-200 hover:bg-emerald-950 hover:px-3 hover:shadow-lg hover:drop-shadow-xl">
				<Card.Header class="flex flex-row">
					<div>
						<Card.Title>{name}</Card.Title>
						<Card.Description>{description}</Card.Description>
					</div>
					<img src={icon} alt={name + '-icon'} class="ml-auto max-w-20 rounded-md" />
				</Card.Header>
			</Card.Root>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Lancer Minecraft</Dialog.Title>
				<Dialog.Description>Séléctionnez la façon de lancer Minecraft</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Launcher</Label>
					<EventCardSelect
						on:selected={(v) => {
							choosenLauncher = v.detail;
						}}
						items={launchers}
						placeholder="Sélectionnez un launcher" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="version" class="text-right">Version</Label>
					<EventCardSelect
						on:selected={(v) => {
							choosenVersion = v.detail;
						}}
						placeholder="Sélectionnez une version"
						rem={16}
						items={versions.map((v) => ({ label: v, value: v }))} />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="modloader" class="text-right">ModLoader</Label>
					<EventCardSelect
						on:selected={(v) => {
							choosenModLoader = v.detail;
						}}
						items={modloaders}
						placeholder="Sélectionnez un launcher" />
				</div>
				<Dropzone
					accept=".zip,.rar,.7z"
					class="h-32"
					on:filedrop={handleDropzone}
					on:fileselected={handleDropzone}
					bind:errorAnim={dropzoneError}
					bind:message={dropzoneMessage} />
			</div>
			<Dialog.Footer>
				{#if choosenLauncher && choosenModLoader && choosenVersion && (fileInfo.path || fileInfo.file)}
					<!-- Checks if the modloader version is supported -->
					<AlertDialog.Root>
						<AlertDialog.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline" on:click={alertChecks}>Continuer</Button>
						</AlertDialog.Trigger>
						<AlertDialog.Content>
							<AlertDialog.Header>
								<AlertDialog.Title>Êtes-vous sûr?</AlertDialog.Title>
								<AlertDialog.Description>
									{#if choosenLauncher === 'minecraft'}
										Vous allez <u>créer un profil de configuration</u> avec
										<strong>{launchers.find((la) => la.value === choosenLauncher)?.label}</strong>
										en
										<strong>{choosenVersion + ' ' + modloaders.find((ml) => ml.value === choosenModLoader)?.label}</strong>.
									{:else}
										Vous allez <u>lancer votre jeu</u> avec
										<strong>{launchers.find((la) => la.value === choosenLauncher)?.label}</strong>
										en
										<strong>{choosenVersion + ' ' + modloaders.find((ml) => ml.value === choosenModLoader)?.label}</strong>.
									{/if}
								</AlertDialog.Description>
							</AlertDialog.Header>
							<AlertDialog.Footer>
								<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
								<Dialog.Close>
									<AlertDialog.Action>Continue</AlertDialog.Action>
								</Dialog.Close>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog.Root>
				{:else}
					<Button disabled type="submit">Continuer</Button>
				{/if}
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
