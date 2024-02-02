<script lang="ts">
  import AddStep from "./lib/AddStep.svelte";
  import Steps from "./lib/Steps.svelte";
  import { state } from "./store";
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
    <AddStep />
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
