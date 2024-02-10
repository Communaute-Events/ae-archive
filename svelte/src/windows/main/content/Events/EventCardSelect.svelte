<script lang="ts">
    import * as Select from "$lib/components/ui/select"
    import { createEventDispatcher } from "svelte";

    export let items: {label: string, value: string, icon?: string }[] = []
    export let rem = 0;
    export let placeholder = "Select..."

    const dispatch = createEventDispatcher<{selected: string}>()

    function handleClick(value: string) {
        dispatch("selected",value)
    }
</script>

<Select.Root>
    <Select.Trigger id="launcher" class="w-[275px]">
        <Select.Value placeholder={placeholder} />
    </Select.Trigger>
    <Select.Content style={rem !== 0 ? `overflow-y: auto; height: ${rem}rem;` : 'overflow-y: auto;'}>
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