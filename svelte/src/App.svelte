<script lang="ts">
	import WebSocketComponent from "./components/WebSocket.svelte"
	import {type WebsocketMessage} from "./types/websocket"

	let websocket: WebSocket
	let websocketMessages: WebsocketMessage[] = []
	function onWebsocketMessage(msg: CustomEvent<string>) {
		try {
			websocketMessages.push(JSON.parse(msg.detail))
			websocketMessages = websocketMessages
		} catch (err) {
			console.log(err)
		}
	}
</script>

<main>

	<h1>AutoEvent</h1>
	<WebSocketComponent on:message={onWebsocketMessage} bind:websocket />
	{#if websocket && websocket.readyState === WebSocket.OPEN}
		{#each websocketMessages as msg}
			<div style="display:flex; justify-content: space-between;">
				<p>{msg._type}: {msg.message ? msg.message.data.content : "None"}</p>
				<p style="color: green">
					({msg.eventSource ? msg.eventSource.name : "None"})
				</p>
			</div>
		{/each}
	{/if}
</main>
