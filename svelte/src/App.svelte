<script lang="ts">
	import terminal from "virtual:terminal"
	import WebSocketComponent from "./components/WebSocket.svelte"
	import { showNotification } from "./lib/modules/notifications"
	import {type WebsocketMessage, EventMessageType} from "./types/websocket"
	import { os, window as w} from "@neutralinojs/lib"
	import { focusWindow } from "./lib/modules/window"

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
					timeout: 600
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

<main>
	<button class="window-state-btn" on:click={w.hide}>Cacher la fenêtre</button>
	<h1 class="title">AutoEvent</h1>
	<button on:click={notifClick}>Test notifications</button>
	<WebSocketComponent on:message={onWebsocketMessage} bind:websocket bind:status/>
	{#if websocket && status}
		{#each websocketMessages as msg}
			{#if msg._type !== "status"}
			<button on:click={notifClick}>{msg.message.data.cleanContent.substring(0,20)}{msg.message.data.cleanContent.length > 20 ? '...' : ''}</button>
			{/if}
		{/each}
	{:else if websocket && !status}
		<p style="color: red">An error occured and the websocket is closed. Restarting the connexion...</p>
	{/if}
	{#if window.DATA}
		<p>Window Data: {window.DATA}</p>
	{/if}
</main>

<style>

	.title {
		position: absolute;
		top: -10px;
		left: 50%;
		transform: translate(-50%)
	}

	.window-state-btn {
		position: absolute;
		top: 10px;
		right: 10px;
	}
</style>