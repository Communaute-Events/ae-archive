import type { WebsocketMessage } from "src/types/websocket";
import { writable } from "svelte/store";

export const websocketMessages = writable<WebsocketMessage[]>([])