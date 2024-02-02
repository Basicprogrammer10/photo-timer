<script lang="ts">
  import Steps from "./lib/Steps.svelte";
  import { state } from "./store";

  let selected = "wait";
</script>

<main>
  <h1>Photo Timer</h1>
  <p>Created By Connor Slade</p>

  <div class="section">
    <h1>3:15</h1>
    <p>Agitate consciously</p>

    <button>Start</button>
    <button>Pause</button>
    <button>Continue</button>
  </div>

  <div class="section">
    <select bind:value={selected}>
      <option value="wait">Wait</option>
      <option value="instruction">Instruction</option>
    </select>

    <button>+</button>

    <br />
    <br />
    <input type="text" placeholder="Description" />

    {#if selected === "wait"}
      <!-- TIME SELECTOR -->
    {/if}
  </div>

  <div class="section">
    {#if $state.steps.length > 0}
      <Steps />
    {:else}
      <em>No steps...</em>
    {/if}
  </div>
</main>

<style>
  .section {
    border: 1px solid #000;
    padding: 10px;
    width: max-content;
    margin-top: 10px;
  }
</style>
