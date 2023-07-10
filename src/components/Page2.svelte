<script>
  import cars from "../store/cars";

  let allCarData;
  const unsubscribe = cars.subscribe((value) => {
    allCarData = value;
  });
</script>

<div class="p-10">
  {#each allCarData as man}
    <div class=" text-xl font-semibold mt-4">{man.manufacturer}</div>
    {#each man.cars as car}
      <div class="ml-8 mt-1 text-lg">- {car.model}</div>
    {/each}
  {/each}
</div>
