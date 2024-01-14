<script lang="ts">
	import {onMount, createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher<{message: string}>()
	let websocketPromise: Promise<WebSocket>

	async function awaitWebsocket(url: string): Promise<WebSocket> {
		return new Promise<WebSocket>((resolve, reject) => {
			const socket = new WebSocket(url)

			socket.onopen = () => {
				resolve(socket)
			}

			socket.onerror = (err) => {
				reject(err)
			}
		})
	}
  
    async function getWebsocket(): Promise<WebSocket> {
        const res = await fetch("https://raw.githubusercontent.com/Communaute-Events/paths/main/paths.json")
        const data = await res.json()
        const ws = await awaitWebsocket(data.websocket)
        ws.onmessage = (msg) => {
            dispatch("message", msg.data)
        }
        return ws
    }

    onMount(()=>{
        websocketPromise = getWebsocket()
    })
</script>

<main>
	{#await websocketPromise}
		<p>Loading websocket...</p>
    {:catch}
        <p style="color: red;">An error occured while loading the WebSocket.</p>
	{/await}
</main>
