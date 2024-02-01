<script lang="ts">
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
    <div class="program-item">
      <button>×</button>
      <button>⇑</button>
      <button>⇓</button>
      <p><span class="program-item-info">WAIT 3m</span> Agitate consciously</p>
    </div>
  </div>
</main>

<style>
  .section {
    border: 1px solid #000;
    padding: 10px;
    width: max-content;
    margin-top: 10px;
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
