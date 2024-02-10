<script lang="ts">
    import * as Select from "$lib/components/ui/select"
    import { createEventDispatcher } from "svelte";
    import terminal from "virtual:terminal"

    export let items: {label: string, value: string, icon?: string }[] = []
    export let height = 0;
    export let placeholder = "Select..."

    const dispatch = createEventDispatcher<{selected: string}>()

    function handleClick(value: string) {
        dispatch("selected",value)
    }

    const contentStyle = "overflow-y-auto" + (height !== 0 ? " h-" + height : "")

</script>

<Select.Root>
    <Select.Trigger id="launcher" class="w-[275px]">
        <Select.Value placeholder={placeholder} />
    </Select.Trigger>
    <Select.Content class={contentStyle}>
        {#each items as item}
            <Select.Item value={item.value} label={item.label} on:click={()=>{handleClick(item.value)}} class="cursor-pointer">
                <div class="flex items-center">
                    {#if item.icon}
                        <img src={item.icon} alt={`${item.label} Icon`} class="w-[25px] mr-3">
                    {/if}
                    {item.label}
                </div>
            </Select.Item>
        {/each}
    </Select.Content>
</Select.Root>