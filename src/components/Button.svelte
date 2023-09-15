<script lang="ts">
  export let onClick: () => void;
  export let label = "";
  export let className = "";
</script>

<button
  type="button"
  on:click={onClick}
  class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center {className}"
>
  {label}
  <slot />
</button>
