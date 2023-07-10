<!-- src/routes/_layout.svelte -->
<script>
  // Component logic goes here
  import "../app.css";
  import { Router, Route } from "svelte-routing";
  import Page2 from "../components/Page2.svelte";
</script>

<main class="flex flex-col h-screen">
  <!-- Common header -->
  <header class="w-full h-10 flex">
    <span class="w-full flex items-center justify-center">
      <h1 class="font-bold text-lg tracking-widest">C a r s</h1>
    </span>
  </header>

  <!-- Slot to insert the content of individual pages -->
  <div class="flex flex-1">
    <Router>
      <Route path="/">
        <slot />
      </Route>
      <Route path="/page2">
        <div class="h-full w-full">
          <Page2 />
        </div>
      </Route>
    </Router>
  </div>

  <!-- Common footer -->
  <footer class="bg-purple-800 w-full h-10 flex items-center justify-center">
    <p>&copy; {new Date().getFullYear()} C a r s</p>
  </footer>
</main>

<style>
  /* Layout styles */
</style>
