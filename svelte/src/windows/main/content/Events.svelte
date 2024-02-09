<script lang="ts">
	import WebSocketComponent from "../WebSocket.svelte"
	import {showNotification} from "../../../lib/modules/notifications"
	import {
		type WebsocketMessage,
		EventMessageType,
	} from "../../../types/websocket"
	import {window as w} from "@neutralinojs/lib"
	import Button from "$lib/components/ui/button/button.svelte"

	let websocket: WebSocket
	let status: boolean
	let websocketMessages: WebsocketMessage[] = []

	async function onWebsocketMessage(msg: CustomEvent<string>) {
		try {
			const data: WebsocketMessage = JSON.parse(msg.detail)
			websocketMessages.push(data)
			websocketMessages = websocketMessages

			if (data._type !== EventMessageType.Status) {
				await w.show()
				showNotification({
					title: `Event Détecté | ${data.eventSource.name}`,
					content: "Cliquez pour en savoir plus",
					sound: true,
					timeout: 600,
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	async function notifClick() {
		showNotification({
			title: "boooo",
			content: "hiii worlddd",
			timeout: 3,
		})
	}
</script>

<main class="m-10">
	<h1 class="title">AutoEvent</h1>
	<Button class="window-state-bt" on:click={w.hide}>Cacher la fenêtre</Button>
	<Button on:click={notifClick}>Test notifications</Button>
	<WebSocketComponent
		on:message={onWebsocketMessage}
		bind:websocket
		bind:status
	/>
	{#if websocket && status}
		{#each websocketMessages as msg}
			{#if msg._type !== "status"}
				<Button on:click={notifClick}
					>{msg.message.data.cleanContent.substring(0, 20)}{msg.message.data
						.cleanContent.length > 20
						? "..."
						: ""}</Button
				>
			{/if}
		{/each}
	{:else if websocket && !status}
		<p style="color: red">
			An error occured and the websocket is closed. Restarting the connexion...
		</p>
	{/if}
	{#if window.DATA}
		<p>Window Data: {window.DATA}</p>
	{/if}
</main>
