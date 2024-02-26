<script lang="ts">
	import WebSocketHandler from "../WebSocketHandler.svelte"
	import {showNotification} from "../../../lib/modules/notifications"
	import {websocketMessages} from "./Events/EventStore"
	import {type WebsocketMessage, EventMessageType} from "../../../types/websocket"
	import {window as w} from "@neutralinojs/lib"
	import EventCard from "./Events/EventCard.svelte"

	let websocket: WebSocket
	let status: boolean
	let socketMessages: WebsocketMessage[] = []

	websocketMessages.subscribe((messages) => {
		socketMessages = messages
	})

	async function onWebsocketMessage(msg: CustomEvent<string>) {
		try {
			const data: WebsocketMessage = JSON.parse(msg.detail)
			websocketMessages.update((msgs) => [...msgs, data])

			if (data._type !== EventMessageType.Status) {
				await w.show()
				showNotification({
					title: data.eventSource.name,
					content: "Cliquez pour en savoir plus",
					sound: true,
					timeout: 600,
					id: "events",
				})
			}
		} catch (err) {
			console.log(err)
		}
	}
</script>

<main class="w-full overflow-y-auto">
	<h1 class="text-center mt-5 font-minecraft">AutoEvent</h1>
	<div class="m-10 h-full">
		<WebSocketHandler
			on:message={onWebsocketMessage}
			bind:websocket
			bind:status
		/>
		{#if websocket && status}
			{#each $websocketMessages as msg}
				{#if msg._type !== "status"}
					<EventCard
						name={msg.eventSource.name}
						description={msg.message.data.cleanContent.substring(0, 100)}
						icon={msg.guild.iconUrl}
						class="mb-4"
					/>
				{/if}
			{/each}
		{:else if websocket && !status}
			<p style="color: red">
				An error occured and the websocket is closed. Restarting the
				connection...
			</p>
		{/if}
		{#if window.DATA}
			<p>Window Data: {window.DATA}</p>
		{/if}
	</div>
</main>
