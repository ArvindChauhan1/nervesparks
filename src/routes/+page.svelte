<!-- src/routes/Home.svelte -->
<script>
  import ContentArea from "../components/ContentArea.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  let isSidebar = true;
  let dataForChild2;
</script>

<div class="flex h-full relative">
  <button
    class="p-2 px-4 text-center flex items-center justify-center absolute top-[-40px] left-0 bg-violet-800 w-10 h-10"
    on:click={() => (isSidebar = !isSidebar)}
  >
    <svg viewBox="0 0 70 80" width="100%" height="100%" fill="#FFFFFF">
      <rect width="70" height="5" />f
      <rect y="20" width="70" height="5" />
      <rect y="40" width="70" height="5" />
    </svg>
  </button>
  <Sidebar {isSidebar} />
  <div class="flex-1 p-4 w-full">
    <ContentArea />
  </div>
</div>

<style>
  /* Home page specific styles */
</style>
