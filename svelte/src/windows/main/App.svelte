<script lang="ts">
	import Sidebar from "./Sidebar.svelte"
	import Events from "./content/Events.svelte"

	export let currentPage: string = "events";
</script>

<main>
	<div class="flex">
		<Sidebar
			items={[
				{label: "Evenements", icon: "✨"},
				{label: "Paramètres", icon: "⚙️"},
			]}
		/>
		<div class="content">
			{#if currentPage === "events"}
				<Events/>
			{/if}
		</div>
	</div>
</main>

<style>
	:global(body) {
		@apply bg-emerald-800 overflow-hidden;
	}
</style>
