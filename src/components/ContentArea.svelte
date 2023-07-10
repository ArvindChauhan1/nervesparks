<script>
  import { selectedManufacturerFromCars } from "../store/cars";

  let currentManufacturer;

  // Subscribe to the selectedManufacturerFromCars store
  const unsubscribe = selectedManufacturerFromCars.subscribe((selected) => {
    currentManufacturer = selected;
  });
</script>

<div class="p-7 pt-10">
  {#if currentManufacturer !== null}
    <span class=" text-slate-800 text-3xl font-bold tracking-wider"
      >manufacturer : <span class="text-violet-800"
        >{currentManufacturer.manufacturer}</span
      ></span
    >
    {#each currentManufacturer.cars as car}
      <div class="m-3 ml-4 text-xl font-semibold tracking-wider">
        <span>{car.model}</span>
        <span>:</span>
        <span>{car.year}</span>
      </div>
    {/each}
  {:else}
    <div class="text-violet-800 text-3xl font-bold tracking-wider">
      Nothing selected
    </div>
  {/if}
</div>

<style>
</style>
