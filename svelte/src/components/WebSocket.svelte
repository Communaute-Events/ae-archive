<script lang="ts">
	// Imports
	import {onMount, createEventDispatcher} from "svelte"

	// Props
	export let websocket: WebSocket;
	export let status = false;

	// Variables
    const dispatch = createEventDispatcher<{message: string}>()
	let websocketPromise: Promise<WebSocket>

	// Functions
	async function awaitWebsocket(url: string): Promise<WebSocket> {
		return new Promise<WebSocket>((resolve, reject) => {
			const socket = new WebSocket(url)

			socket.onopen = () => {
				status = true
				resolve(socket)
			}

			socket.onerror = (err) => {
				reject(err)
			}
		})
	}

	async function wsError(err: string | Event) {
		console.log("Websocket Error: \n" + err)
		status = false
		getWebsocket()
	}
  
    async function getWebsocket(): Promise<WebSocket> {
        const res = await fetch("https://raw.githubusercontent.com/Communaute-Events/paths/main/paths.json")
        const data = await res.json()
        const ws = await awaitWebsocket(data.websocket)
		websocket = ws

        ws.onmessage = (msg) => {
            dispatch("message", msg.data)
        }

		ws.onclose = (e) => {
			wsError(e.reason)
		}

		ws.onerror = (error) => {
			wsError(error)
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
