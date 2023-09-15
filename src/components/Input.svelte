<script>
  export let value;
  export let label = "";
  export let type = "text";
  function typeAction(node) {
    node.type = type;
  }
</script>

<label
  for={label}
  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >{label}</label
>
<input
  id={label}
  use:typeAction
  bind:value
  class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  required
/>
