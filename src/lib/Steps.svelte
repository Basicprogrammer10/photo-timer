<script lang="ts">
  import { state, Wait } from "../program";
  import { formatTime } from "../time";
  import { timer } from "../timer";

  const deleteStep = (idx: number) =>
    state.update((s) => {
      s.delete(idx);
      return s;
    });

  const moveUp = (idx: number) =>
    state.update((s) => {
      s.moveUp(idx);
      return s;
    });

  const moveDown = (idx: number) =>
    state.update((s) => {
      s.moveDown(idx);
      return s;
    });

  $: color = (idx: number) => {
    if ($timer.step == idx) return "#3C3";
    else return "#999";
  };
</script>

<main>
  <div class="steps">
    {#each $state.steps as instruction, idx}
      <div class="program-item">
        <button on:click={() => deleteStep(idx)}>×</button>
        <button on:click={() => moveUp(idx)}>⇑</button>
        <button on:click={() => moveDown(idx)}>⇓</button>
        <p>
          {#if instruction instanceof Wait}
            <!-- if $timer.step == idx set color to green -->
            <span class="program-item-info" style:background-color={color(idx)}>
              Wait {formatTime(instruction.time)}
            </span>
          {:else}
            <span class="program-item-info" style:background-color={color(idx)}>
              {instruction.name}
            </span>
          {/if}
          {instruction.description}
        </p>
      </div>
    {/each}
  </div>
</main>

<style>
  .steps {
    display: grid;
  }

  .program-item {
    display: ruby;
  }

  .program-item-info {
    padding: 5px;
    border-radius: 5px;
  }
</style>
