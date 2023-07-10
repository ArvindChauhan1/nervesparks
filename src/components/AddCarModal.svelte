<script>
  import { createEventDispatcher } from "svelte";
  import cars, { addCar } from "../store/cars";
  let carData;
  const unsubscribe = cars.subscribe((value) => {
    carData = value;
  });

  export let showModal = false;
  export let newManufacturer = "";
  export let newModel = "";
  export let newYear = "";

  const dispatch = createEventDispatcher();

  let isNewManufacturer = false;

  function handleAddCar() {
    if (newManufacturer === "" || newModel === "" || newYear === "") {
      showPromptMessage();
      return;
    }
    addCar(newManufacturer, {
      model: newModel,
      year: newYear,
    });
    resetForm();
    showModal = false;
    dispatch("dataAdd", carData);
  }
  let showMessage = false;

  // Function to toggle the custom message visibility
  function showPromptMessage() {
    showMessage = true;
    setTimeout(() => {
      showMessage = false;
    }, 2000); // Hide the message after 2 seconds (adjust as needed)
  }

  function resetForm() {
    newManufacturer = "";
    newModel = "";
    newYear = "";
    isNewManufacturer = false;
  }
</script>

{#if showModal}
  <div
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <!-- Modal content -->
    <div class="bg-white p-4 rounded shadow-md w-80">
      <h2 class="text-xl font-semibold mb-4">Add Car</h2>
      {#if showMessage}
        <div
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div class="p-6 bg-white rounded-md">
            <p class="text-red-500">All fields are mandatory.</p>
          </div>
        </div>
      {/if}
      <form>
        <button
          on:click={() => {
            isNewManufacturer = !isNewManufacturer;
          }}
          class="bg-purple-600 px-2 text-center rounded text-white block"
          >{isNewManufacturer ? "not new" : "new"}</button
        >
        <label for="">manufacturer</label>
        {#if isNewManufacturer}
          <input
            class=" border-2"
            type="text"
            value={newManufacturer}
            on:input={(event) => (newManufacturer = event.target.value)}
            placeholder="manufacturer"
          />
        {:else}
          <select
            name="manufacturer"
            id="manufacturer"
            on:change={(event) => (newManufacturer = event.target.value)}
          >
            <option value="">Select None</option>
            {#each carData as data}
              <option value={data.manufacturer}>{data.manufacturer}</option>
            {/each}
            <label for="">car</label>
            <input type="text" />
          </select>
        {/if}
        <div>
          <label for="">new Model</label>
          <input
            class=" border-2"
            type="text"
            value={newModel}
            on:input={(event) => (newModel = event.target.value)}
            placeholder="new model"
          />
        </div>
        <div>
          <label for="">year</label>
          <input
            class=" border-2"
            type="number"
            value={newYear}
            on:input={(event) => (newYear = event.target.value)}
            placeholder="year"
          />
        </div>
      </form>
      <div class="flex justify-end mt-6">
        <button
          class="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          on:click={() => (showModal = false)}>Cancel</button
        >
        <button
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          on:click={handleAddCar}>Add Car</button
        >
      </div>
    </div>
  </div>
{/if}
