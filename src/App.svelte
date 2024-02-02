<script lang="ts">
  import AddStep from "./lib/AddStep.svelte";
  import Steps from "./lib/Steps.svelte";
  import { state } from "./program";
  import { Timer } from "./timer";
  import { formatTimeClock } from "./time";
  import { timer } from "./timer";

  const timerAction = (action: (timer: Timer) => void) =>
    timer.update((timer) => {
      action(timer);
      return timer;
    });
</script>

<main>
  <h1>Photo Timer</h1>
  <p>Created By Connor Slade</p>

  <hr />

  <div class="section">
    {#if $timer.isDone()}
      <h1>Timer is done!</h1>
    {/if}

    {#if $timer.remainingTime() >= 0}
      <h1 class="time">{formatTimeClock($timer.remainingTime())}</h1>
    {/if}

    {#if $timer.description()}
      <p>{$timer.description()}</p>
    {/if}

    <button
      on:click={() => timerAction((t) => t.start())}
      disabled={$timer.running || !$timer.isWaiting()}
    >
      Start
    </button>
    <button
      on:click={() => timerAction((t) => t.pause())}
      disabled={!$timer.running || !$timer.isWaiting()}
    >
      Pause
    </button>
    <button
      on:click={() => timerAction((t) => t.continue())}
      disabled={$timer.isDone()}
    >
      Continue
    </button>
    <button on:click={() => timerAction((t) => t.reset())}>Reset</button>
  </div>

  <hr />

  <div class="section">
    <AddStep />
  </div>

  <hr />

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
    padding: 10px;
    width: max-content;
    margin-top: 10px;
  }

  .time {
    margin-top: 0;
  }
</style>
