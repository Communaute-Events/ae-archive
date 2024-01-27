<script lang="ts">
	import WebSocketComponent from "./components/WebSocket.svelte"
	import {type WebsocketMessage, EventMessageType} from "./types/websocket"
	import { os, window } from "@neutralinojs/lib"

	let websocket: WebSocket
	let status: boolean
	let websocketMessages: WebsocketMessage[] = []
	async function onWebsocketMessage(msg: CustomEvent<string>) {
		try {
			const data: WebsocketMessage = JSON.parse(msg.detail)
			websocketMessages.push(data)
			websocketMessages = websocketMessages

			if (data._type !== EventMessageType.Status) {
				window.show()
				// await window.setFullScreen()
				// await setTimeout(()=>{window.exitFullScreen()},500)
				const button = await os.showMessageBox('AutoEvent','Un évent a été détecté. Rendez-vous sur l\'application pour plus d\'informations.', os.MessageBoxChoice.OK, os.Icon.INFO)
				if (button == "CANCEL") {
					await window.setFullScreen()
					await setTimeout(window.exitFullScreen,1000)
				}
			}
		} catch (err) {
			console.log(err)
		}
	}
</script>

<main>
	<button class="window-state-btn" on:click={window.hide}>Cacher la fenêtre</button>
	<h1 class="title">AutoEvent</h1>
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