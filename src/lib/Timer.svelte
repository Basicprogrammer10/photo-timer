<script lang="ts">
  import { Timer } from "../timer";
  import { formatTimeClock } from "../time";
  import { timer } from "../timer";

  const timerAction = (action: (timer: Timer) => void) =>
    timer.update((timer) => {
      action(timer);
      return timer;
    });
</script>

<main>
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
</main>

<style>
  .time {
    margin-top: 0;
  }
</style>
