import { writable } from "svelte/store";

export class Program {
  steps: Step[] = [];

  constructor() {
    try {
      const stored = window.localStorage.getItem("program");
      if (stored) {
        const data = JSON.parse(stored);
        this.steps = data.steps.map((step: any) => {
          if (step.name === "Wait")
            return new Wait(step.description, step.time);
          return new Instruction(step.description);
        });
      }
    } catch (e) {}

    if (this.steps.length === 0) {
      this.steps = [
        new Wait("Wait for five seconds", 5),
        new Instruction("Fill with water"),
        new Wait("Wait again", 8),
      ];
    }
  }

  add(step: Step) {
    this.steps.push(step);
  }

  moveUp(index: number) {
    if (index > 0) {
      const temp = this.steps[index - 1];
      this.steps[index - 1] = this.steps[index];
      this.steps[index] = temp;
    }
  }

  moveDown(index: number) {
    if (index < this.steps.length - 1) {
      const temp = this.steps[index + 1];
      this.steps[index + 1] = this.steps[index];
      this.steps[index] = temp;
    }
  }

  delete(index: number) {
    this.steps.splice(index, 1);
  }
}

export abstract class Step {
  description: string;
  name: string | null = null;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export class Wait extends Step {
  time: number;

  constructor(description: string, time: number) {
    super("Wait", description);
    this.time = time;
  }
}

export class Instruction extends Step {
  constructor(description: string) {
    super("Instruction", description);
  }
}

export const program = new Program();
export const state = writable(program);

state.subscribe((value) => {
  window.localStorage.setItem("program", JSON.stringify(value));
});
