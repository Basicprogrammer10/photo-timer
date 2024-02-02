import { writable } from "svelte/store";
import { Wait, program } from "./program";

export class Timer {
  running = false;
  timestamp = 0;
  step = 0;
  paused: number | null = null;

  update() {
    if (!this.running) return;

    if (this.step >= program.steps.length) {
      this.running = false;
      return;
    }

    let elapsed = (Date.now() - this.timestamp) / 1000;
    let step = program.steps[this.step];

    if (step instanceof Wait) {
      if (elapsed >= step.time) {
        this.step++;
        this.timestamp = Date.now();
      }
    }
  }

  start() {
    this.running = true;
    if (this.paused == null) this.timestamp = Date.now();
    else {
      let step = program.steps[this.step];
      if (step instanceof Wait && this.paused != null)
        this.timestamp = Date.now() - this.paused;
    }
    this.paused = null;
  }

  pause() {
    this.running = false;
    let step = program.steps[this.step];
    if (step instanceof Wait) this.paused = Date.now() - this.timestamp;
  }

  continue() {
    this.step++;
    this.timestamp = Date.now();
  }

  reset() {
    this.running = false;
    this.step = 0;
    this.timestamp = 0;
  }

  isWaiting(): boolean {
    return (
      this.step < program.steps.length &&
      program.steps[this.step] instanceof Wait
    );
  }

  isDone(): boolean {
    return this.step >= program.steps.length;
  }

  description(): string | null {
    if (this.step >= program.steps.length) return null;

    let step = program.steps[this.step];
    return step.description;
  }

  remainingTime(): number {
    if (this.step >= program.steps.length) return -1;

    let step = program.steps[this.step];
    if (step instanceof Wait) {
      if (this.paused != null) return step.time - this.paused / 1000;
      let elapsed = (Date.now() - this.timestamp) / 1000;
      return step.time - elapsed;
    }

    return -1;
  }
}

export const timer = writable(new Timer());

setInterval(() => {
  timer.update((timer) => {
    timer.update();
    return timer;
  });
}, 1000);
