<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { filedrop, type FileDropOptions, type Files } from 'filedrop-svelte';
	import { toast } from 'svelte-sonner';
	import { createEventDispatcher } from 'svelte';
	import acc from 'attr-accept';
	import { os } from '@neutralinojs/lib';
	import { fade } from 'svelte/transition';

	export let accept: string;
	export let message = 'Glissez vos fichiers ou cliquez ici';
	export let limit = 1;
	let fileSelected = false;

	const dispatch = createEventDispatcher<{ filedrop: Files; fileselected: string }>();

	function handleDragOver(e: CustomEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	function handleDrop(e: CustomEvent) {
		e.preventDefault();
		e.stopImmediatePropagation();

		if (e.detail.files.length > 0) {
			e.detail.originalEvent.preventDefault();
			e.detail.originalEvent.stopImmediatePropagation();
		}

		const files: Files = e.detail.files;
		if (!files) {
			toast.error('There was an error processing your files!');
		}
		if (files.accepted.length > limit) {
			toast.error(`Vous ne pouvez pas upload plus que ${limit} fichier${limit > 1 ? 's' : ''}`);
			return;
		}
		if (files.accepted.length > 0) {
			fileSelected = true;
		}
		dispatch('filedrop', files);
	}

	async function handleClick(e: MouseEvent) {
		e.stopImmediatePropagation();
		e.preventDefault();

		const filePath = (
			(await os.showOpenDialog('Sélectionnez votre fichier', {
				defaultPath: await os.getPath('downloads'),
				filters: [{ name: 'Archives', extensions: ['zip', 'rar', '7z'] }],
			})) as string[]
		)[0];
		if (!filePath) return;

		dispatch('fileselected', filePath);
		fileSelected = true;
	}

	let shake = false;
	export function errorAnim() {
		shake = true;
		setTimeout(() => {
			shake = false;
		}, 1000);
	}
</script>

<button
	use:filedrop={{ accept, clickToUpload: false }}
	on:click={handleClick}
	on:filedrop={handleDrop}
	class={`rounded-lg transition duration-500 ${shake ? 'border-red-800 border-[2px] animate-shake' : 'border'}`}>
	<Card.Root class={`border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${$$props.class}`} {...$$props}>
		<Card.Content
			class={`flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs duration-150`}
			on:dragover={handleDragOver}>
			<div
				class="flex flex-col items-center justify-center text-muted-foreground hover:opacity-50 duration-200 cursor-pointer mt-2">
				{#if fileSelected}
					<svg
						in:fade={{ delay: 10 }}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke={shake ? '#991B1B' : 'currentColor'}
						class="w-12 h-12 opacity-80">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke={shake ? '#991B1B' : 'currentColor'}
						class="w-12 h-12 opacity-50 duration-500">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
					</svg>
				{/if}
				<span
					class={`font-medium duration-500 text-sm ${shake ? 'text-red-800' : ''} ${fileSelected ? 'opacity-80' : 'opacity-50'}`}
					>{message}</span>
			</div>
			<p class="text-muted-foreground">{''}</p>
			<span class="text-red-500">{''}</span>
		</Card.Content>
	</Card.Root>
</button>
