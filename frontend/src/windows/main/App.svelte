<script lang="ts">
	import { getMode } from '$lib/modules/env';
	import Sidebar from './Sidebar.svelte';
	import Dev from './content/Dev.svelte';
	import Events from './content/Events.svelte';
	import Settings from './content/Settings.svelte';
	import { fly } from 'svelte/transition';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	let page: string = 'events';

	const sidebarItems = [
		{ label: 'Evenéments', id: 'events', icon: '✨' },
		{ label: 'Paramètres', id: 'settings', icon: '⚙️' },
	];
	if (getMode() === 'dev') {
		sidebarItems.push({ label: 'Dev Panel', id: 'dev', icon: '🤖' });
	}
</script>

<style>
	:global(body) {
		@apply bg-emerald-800 overflow-hidden;
	}
</style>

<main>
	<ModeWatcher defaultMode={'dark'} />
	<Toaster richColors />
	<div class="flex">
		<Sidebar bind:page items={sidebarItems} />
		<div class="content flex-grow">
			{#if page === 'events'}
				<div in:fly={{ y: -2000, duration: 1000 }} out:fly={{ y: 200, duration: 300 }}>
					<Events />
				</div>
			{:else if page === 'settings'}
				<div in:fly={{ y: -2000, duration: 1000 }} out:fly={{ y: 200, duration: 300 }}>
					<Settings />
				</div>
			{:else if page === 'dev'}
				<div in:fly={{ y: -2000, duration: 1000 }} out:fly={{ y: 200, duration: 300 }}>
					<Dev />
				</div>
			{/if}
		</div>
	</div>
</main>
