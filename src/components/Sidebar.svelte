<!-- CarList.svelte -->

<script>
  // Import the cars store and manipulation functions from cars.js
  import cars, { updateSelected } from "../store/cars";
  import { onMount } from "svelte";
  import AddCarModal from "./AddCarModal.svelte";

  // Subscribe to the cars store to get the current car data
  // This will automatically update whenever the data in the store changes
  let carData;
  const unsubscribe = cars.subscribe((value) => {
    carData = value;
  });

  // Initialize the expanded state for each car manufacturer
  let expandedState = {};

  // Function to toggle the car data visibility for a specific manufacturer
  function toggleManufacturer(manufacturer) {
    expandedState[manufacturer] = !expandedState[manufacturer];
    expandedState = { ...expandedState }; // Trigger reactivity
  }

  // Close all car data when the component is first mounted
  onMount(() => {
    carData.forEach((car) => {
      expandedState[car.manufacturer] = false;
    });
  });

  // Modal state and form inputs
  let isModalOpen = false;

  // Function to toggle the modal visibility
  function toggleModal() {
    isModalOpen = !isModalOpen;
  }

  export let isSidebar;
  // Reactive variable for the search input value
  let filteredData = carData;
  let searchValue = "";

  // Function to update the search value
  function updateSearchValue(event) {
    searchValue = event.target.value;
  }

  // Filter the carData based on the searchValue
  // Function to filter the car data based on the searchValue
  function filterCarsByManufacturer() {
    // if (!searchValue) return cars; // If searchValue is empty, show all cars
    filteredData = carData.filter((car) =>
      car.manufacturer.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  let selectedCarData;
  function addedData(data) {
    console.log("Data received in Sidebar:", data.detail);
    filteredData = data.detail;
    dispatch("dataUpdate", filteredData);
  }
</script>

{#if isSidebar}
  <div class="bg-violet-800 p-5 pb-7 h-full">
    <h2 class="w-full text-center font-bold text-zinc-200 text-2xl">
      Car List
    </h2>
    <!-- Search input and button -->
    <div class="mt-4 flex justify-center">
      <input
        type="text"
        placeholder="Search by Manufacturer..."
        class="px-4 py-2 border border-gray-300 rounded-lg"
        bind:value={searchValue}
        on:input={updateSearchValue}
      />
      <button
        class="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        on:click={filterCarsByManufacturer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          />
        </svg></button
      >
    </div>
    {#each filteredData as car}
      <div class="p-2 text-slate-200 font-semibold">
        <button
          class="focus:outline-none"
          on:click={() => {
            updateSelected(car.manufacturer);
          }}
        >
          {car.manufacturer}
          <button
            class="text-2xl"
            on:click={() => toggleManufacturer(car.manufacturer)}
            >{expandedState[car.manufacturer] ? "-" : "+"}</button
          >
        </button>
        {#if expandedState[car.manufacturer]}
          <div class="pl-7 p-2">
            {#each car.cars as cars}
              <div>{cars.model} : {cars.year}</div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}

    <div class="w-full flex items-center justify-center">
      <button
        on:click={toggleModal}
        class="text-slate-900 bg-white p-2 rounded-lg">Add Car</button
      >
    </div>
    <AddCarModal bind:showModal={isModalOpen} on:dataAdd={addedData} />
  </div>
{/if}

<style>
</style>
