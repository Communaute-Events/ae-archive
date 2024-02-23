<script lang="ts">
    export let items: { label: string; icon?: string, id: string }[] = [];
    export let page: string = "events";
  
    // Function to handle item click
    function onItemClick(item: { label: string; icon?: string, id: string }) {
      page = item.id
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
    {#each items as { label, icon, id }, index (label)}
      <button class="item px-5 rounded-md w-full" on:click={() => onItemClick({ label, icon, id })}>
        <div class="icon">{#if icon}{icon}{/if}</div>
        <div class="text-left">{label}</div>
      </button>
    {/each}
  </div>
  