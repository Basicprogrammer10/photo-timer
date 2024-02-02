<script lang="ts">
  import Steps from "../lib/Steps.svelte";
  import { Instruction, Wait, state } from "../store";
  import { parseTime } from "../util";

  let selected = "wait";
  let description = "";
  let duration = "";

  function addStep() {
    state.update((s) => {
      let step;
      switch (selected) {
        case "wait":
          step = new Wait(description, parseTime(duration));
          break;
        case "instruction":
          step = new Instruction(description);
          break;
      }

      if (step) s.add(step);
      return s;
    });
  }
</script>

<main>
  <select bind:value={selected}>
    <option value="wait">Wait</option>
    <option value="instruction">Instruction</option>
  </select>

  <button on:click={addStep}>+</button>

  <br />
  <br />

  {#if selected === "wait"}
    <input
      type="text"
      placeholder="Duration"
      pattern="([0-9.]+[dhms] ?)*"
      bind:value={duration}
    />
    <br />
    <br />
  {/if}

  <input type="text" placeholder="Description" bind:value={description} />
</main>

<style>
  input[pattern]:invalid {
    border-color: red;
  }
</style>
