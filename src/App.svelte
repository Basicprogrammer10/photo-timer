<script lang="ts">
  import AddStep from "./lib/AddStep.svelte";
  import Steps from "./lib/Steps.svelte";
  import Timer from "./lib/Timer.svelte";
  import { state } from "./program";
</script>

<main>
  <h1>Photo Timer</h1>
  <p>Created By Connor Slade</p>

  <hr />
  <div class="section">
    <Timer />
  </div>

  <hr />
  <div class="section">
    {#if $state.steps.length > 0}
      <Steps />
    {:else}
      <em>No steps...</em>
    {/if}
  </div>

  <hr />
  <div class="section">
    <AddStep />
  </div>
</main>

<style>
  .section {
    padding: 10px;
    width: max-content;
    margin-top: 10px;
  }
</style>
