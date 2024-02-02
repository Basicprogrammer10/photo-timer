<script lang="ts">
  import { state, Wait } from "../store";
  import { formatTime } from "../util";

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
            <span class="program-item-info"
              >Wait {formatTime(instruction.time)}</span
            >
          {:else}
            <span class="program-item-info">{instruction.name}</span>
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
    background-color: #999;
    padding: 5px;
    border-radius: 5px;
  }
</style>
