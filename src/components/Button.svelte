<script lang="ts">
  export let onClick: () => void;
  export let label = "";
  export let className = "";
  export let disabled = false;
</script>

<button
  type="button"
  on:click={onClick}
  {disabled}
  class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center
  {disabled ? 'opacity-70 pointer-events-none' : ''}
  {className}"
>
  {label}
  <slot />
</button>
