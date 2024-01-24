<script lang="ts">
	import WebSocketComponent from "./components/WebSocket.svelte"
	import {type WebsocketMessage, EventMessageType} from "./types/websocket"
	import { os, window } from "@neutralinojs/lib"

	let websocket: WebSocket
	let status: boolean
	let websocketMessages: WebsocketMessage[] = []
	function onWebsocketMessage(msg: CustomEvent<string>) {
		try {
			const data: WebsocketMessage = JSON.parse(msg.detail)
			websocketMessages.push(data)
			websocketMessages = websocketMessages

			if (data._type !== EventMessageType.Status) {
				window.show()
				os.showNotification('Event Détecté','Cliquez pour en savoir plus', os.Icon.INFO)
			}
		} catch (err) {
			console.log(err)
		}
	}
</script>

<main>

	<h1>AutoEvent</h1>
	<WebSocketComponent on:message={onWebsocketMessage} bind:websocket bind:status/>
	{#if websocket && status}
		{#each websocketMessages as msg}
			<div style="display:flex; justify-content: space-between;">
				<p>{msg._type}: {msg.message ? msg.message.data.content : "None"}</p>
				<p style="color: green">
					({msg.eventSource ? msg.eventSource.name : "None"})
				</p>
			</div>
		{/each}
	{:else if websocket && !status}
		<p style="color: red">An error occured and the websocket is closed. Restarting the connexion...</p>
	{/if}
</main>
