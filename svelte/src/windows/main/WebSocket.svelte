<script lang="ts">
	// Imports
	import {onMount, createEventDispatcher} from "svelte"

	// Props
	export let websocket: WebSocket;
	export let status = false;

	// Variables
    const dispatch = createEventDispatcher<{message: string}>();
	let websocketPromise: Promise<void>;
	let isReconnecting = false;

	// Functions
	async function awaitWebsocket(url: string): Promise<WebSocket> {
		return new Promise<WebSocket>((resolve, reject) => {
			let socket: WebSocket;
			try {
				socket = new WebSocket(url)
			} catch (err) {
				wsError((err as Event).toString())
				return
			}

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
		if (isReconnecting) return;
		isReconnecting = true
		console.error("Websocket Error: \n" + err)
		status = false
		console.log("Restarting Websocket in 5 secondes")
		setTimeout(getWebsocket,5000)
	}
  
    async function getWebsocket() {
		console.log("Connecting to the WebSocket...")
        const res = await fetch("https://raw.githubusercontent.com/Communaute-Events/paths/main/paths.json")
        const data = await res.json()
        await awaitWebsocket(data.websocket).then(sock => {
			websocket = sock
			isReconnecting = false
		}).catch(err => {
			wsError(err)
			return
		})

        websocket.onmessage = (msg) => {
            dispatch("message", msg.data)
        }

		websocket.onclose = (e) => {
			wsError(e.reason)
		}

		websocket.onerror = (error) => {
			wsError(error)
		}
    }

	// Main
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
