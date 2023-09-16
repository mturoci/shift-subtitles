<script>
  export let val;
  export let label = "";
  export let type = "text";
  function typeAction(node) {
    node.type = type;
  }
</script>

<label for={label} class="block mb-2 text-sm font-medium text-white"
  >{label}</label
>
<input
  id={label}
  use:typeAction
  bind:value={val}
  class="
    mb-3 bg-primary-800/90 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none text-gray-400 text-sm rounded-lg
  focus:outline-secondary block w-full p-2.5"
  required
/>
