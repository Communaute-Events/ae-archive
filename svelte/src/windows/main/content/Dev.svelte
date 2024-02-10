<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
    import { showNotification } from "$lib/modules/notifications";
    import { window as w} from "@neutralinojs/lib"
	import { websocketMessages } from "./Events/EventStore";

	let sendEvent: ()=> void;
	let websocket: WebSocket;

	async function notifClick() {
		showNotification({
			title: "boooo",
			content: "hiii worlddd",
			timeout: 3,
            id: "events"
		})
	}

	function sendTestEvent() {
		const data = JSON.parse(`{"_type":"event","eventSource":{"name":"AutoEvent Internal","description":"Le serveur officiel du bot Discord (support, dev, etc...)","emoji":"🖥️","guildId":"1171557764703723611","channels":["1172904125567074354"],"admins":["1148991156571611197","657938099581616139"],"roles":["1200877312648949841"],"maps":["1192864492208533596"]},"message":{"data":{"channelId":"1172904125567074354","guildId":"1171557764703723611","id":"1205937125724262401","position":null,"createdTimestamp":1707588216001,"type":"DEFAULT","system":false,"content":"<@&1200877312648949841>","authorId":"657938099581616139","pinned":false,"tts":false,"nonce":"1205937124826677248","embeds":[],"components":[],"attachments":[],"stickers":[],"editedTimestamp":null,"mentions":{"everyone":false,"users":[],"roles":["1200877312648949841"],"crosspostedChannels":[],"repliedUser":null,"members":[],"channels":[]},"webhookId":null,"groupActivityApplicationId":null,"applicationId":null,"activity":null,"flags":0,"reference":null,"interaction":null,"cleanContent":"Message interne de AutoEvent pour tester les events."},"url":"https://discord.com/channels/1171557764703723611/1172904125567074354/1205937125724262401"},"author":{"name":"Origaming","id":"657938099581616139"},"guild":{"name":"Communauté Events","id":"1171557764703723611","iconUrl":"https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/apps/www/static/android-chrome-192x192.png"},"timeStamp":"2024-02-10T18:03:36.051Z"}`)
		websocketMessages.update((msgs) => [...msgs,data])
	}
</script>

<main class="m-10">
	<h1>Dev Panel</h1>
	<Button on:click={w.hide}>Cacher la fenêtre</Button>
	<Button on:click={notifClick}>Test notifications</Button>
	<div>
		<Button on:click={sendTestEvent}>Test Event</Button>
	</div>
</main>