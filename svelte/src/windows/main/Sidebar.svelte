<script lang="ts">
    export let items: { label: string; icon?: string }[] = [];
  
    // Function to handle item click
    function onItemClick(item: { label: string; icon?: string }) {
      console.log(`Clicked on ${item.label}`);
      // Add your logic here for handling item clicks
    }
  </script>
  
  <style>
    /* Add your styling here using Tailwind CSS classes */
    .sidebar {
      @apply w-48 p-4 bg-zinc-900 text-white h-screen;
    }
  
    .item {
      @apply flex items-center cursor-pointer mb-2 transition duration-300 ease-in-out;
    }
  
    .item:hover {
      @apply bg-gray-700;
    }
  
    .icon {
      @apply mr-2;
    }
  </style>
  
  <div class="sidebar">
    {#each items as { label, icon }, index (label)}
      <button class="item" on:click={() => onItemClick({ label, icon })}>
        <div class="icon">{#if icon}{icon}{/if}</div>
        <div>{label}</div>
      </button>
    {/each}
  </div>
  