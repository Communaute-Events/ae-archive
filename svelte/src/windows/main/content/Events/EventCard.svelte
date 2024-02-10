<script lang="ts">
	import * as Card from "$lib/components/ui/card"

	import {Button} from "$lib/components/ui/button"
	import * as Dialog from "$lib/components/ui/dialog"
	import {Label} from "$lib/components/ui/label"
	import * as AlertDialog from "../../../../lib/components/ui/alert-dialog";

	import PrismLauncher from "../../../../assets/prismlauncher.png"
	import MinecraftLauncher from "../../../../assets/minecraftlauncher.png"
	import Forge from "../../../../assets/forge.jpg"
	import NeoForge from "../../../../assets/neoforge.png"
	import Fabric from "../../../../assets/fabricmc.png"

	import EventCardSelect from "./EventCardSelect.svelte"
	import {versions} from "$lib/minecraft/data"

	export let name: string
	export let description: string
	export let icon: string

	let choosenLauncher: string | undefined
	let choosenVersion: string | undefined
	let choosenModLoader: string | undefined

	function handleClick() {}

	const launchers: {label: string; value: string; icon: string}[] = [
		{label: "PrismLauncher", value: "prism", icon: PrismLauncher},
		{label: "Minecraft Launcher", value: "minecraft", icon: MinecraftLauncher},
	]

	const modloaders: {label: string; value: string; icon: string}[] = [
		{label: "Fabric", value: "fabric", icon: Fabric},
		{label: "NeoForge", value: "neoforge", icon: NeoForge},
		{label: "Forge", value: "forge", icon: Forge},
	]
</script>

<main>
	<Dialog.Root>
		<Dialog.Trigger class="w-full" on:click={()=>{
			choosenLauncher = undefined;
			choosenVersion = undefined;
			choosenModLoader = undefined;
		}}
			><Card.Root
				class="duration-200 hover:shadow-lg hover:bg-emerald-950 hover:drop-shadow-xl hover:px-3 cursor-pointer w-full text-left"
			>
				<Card.Header class="flex flex-row">
					<div>
						<Card.Title>{name}</Card.Title>
						<Card.Description>{description}</Card.Description>
					</div>
					<img
						src={icon}
						alt={name + "-icon"}
						class="ml-auto max-w-20 rounded-md"
					/>
				</Card.Header>
			</Card.Root>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Lancer Minecraft</Dialog.Title>
				<Dialog.Description>
					Séléctionnez la façon de lancer Minecraft
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Launcher</Label>
					<EventCardSelect
						on:selected={(v) => {
							choosenLauncher = v.detail
						}}
						items={launchers}
						placeholder="Sélectionnez un launcher"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="version" class="text-right">Version</Label>
					<EventCardSelect
						on:selected={(v) => {
							choosenVersion = v.detail
						}}
						placeholder="Sélectionnez une version"
						rem={16}
						items={versions.map((v) => ({label: v, value: v}))}
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="modloader" class="text-right">ModLoader</Label>
					<EventCardSelect
						on:selected={(v) => {
							choosenModLoader = v.detail
						}}
						items={modloaders}
						placeholder="Sélectionnez un launcher"
					/>
				</div>
			</div>
			<Dialog.Footer>
				{#if choosenLauncher && choosenModLoader && choosenVersion}
						<AlertDialog.Root>
							<AlertDialog.Trigger asChild let:builder>
							  <Button builders={[builder]} variant="outline">Show Dialog</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content>
							  <AlertDialog.Header>
								<AlertDialog.Title>Êtes-vous sûr?</AlertDialog.Title>
								<AlertDialog.Description>
									Vous allez lancer votre jeu avec <strong>{modloaders.find(ml => ml.value === choosenModLoader)?.label}</strong> en <strong>{choosenVersion}</strong>.
								</AlertDialog.Description>
							  </AlertDialog.Header>
							  <AlertDialog.Footer>
								<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
								<Dialog.Close>
									<AlertDialog.Action>Continue</AlertDialog.Action>
								</Dialog.Close>
							  </AlertDialog.Footer>
							</AlertDialog.Content>
						  </AlertDialog.Root>
				{:else}
					<Button disabled type="submit">Save changes</Button>
				{/if}
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
	<button class="w-full text-left" on:click={handleClick}> </button>
</main>
