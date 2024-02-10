<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
    import { showNotification } from "$lib/modules/notifications";
    import { window as w} from "@neutralinojs/lib"

	async function notifClick() {
		showNotification({
			title: "boooo",
			content: "hiii worlddd",
			timeout: 3,
            id: "events"
		})
	}
</script>

<main class="m-10">
	<h1>Dev Panel</h1>
	<Button class="window-state-bt" on:click={w.hide}>Cacher la fenêtre</Button>
	<Button on:click={notifClick}>Test notifications</Button>
</main>
