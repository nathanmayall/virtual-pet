const Pet = require("../src/pet");

describe("constructor", () => {
  it("returns an object", () => {
    expect(new Pet("Fido")).toBeInstanceOf(Object);
  });
});

describe("constructor", () => {
  it("sets the name property", () => {
    const pet = new Pet("Fido");

    expect(pet.name).toEqual("Fido");
  });
});

describe("constructor", () => {
  it("has a initial age of 0", () => {
    const pet = new Pet("Fido");

    expect(pet.age).toEqual(0);
  });
});

describe("growUp", () => {
  it("increments the age by 1", () => {
    const pet = new Pet("Fido");

    pet.growUp();

    expect(pet.age).toEqual(1);
  });
  it("increments the hunger by 5", () => {
    const pet = new Pet("Fido");

    pet.growUp();

    expect(pet.hunger).toEqual(5);
  });
  it("decrements the fitness by 3", () => {
    const pet = new Pet("Fido");

    pet.growUp();

    expect(pet.fitness).toEqual(7);
  });
  it("throws an error if the pet is not alive", () => {
    const pet = new Pet("Fido");

    pet.age = 30;

    expect(() => pet.growUp()).toThrow("Your pet is no longer alive :(");
  });
});

describe("feed", () => {
  it("throws an error if the pet is not alive", () => {
    const pet = new Pet("Fido");

    pet.age = 30;

    expect(() => pet.feed()).toThrow("Your pet is no longer alive :(");
  });
});

describe("walk", () => {
  it("adds 4 to fitness", () => {
    const pet = new Pet("Fido");

    pet.growUp();
    pet.feed();
    pet.growUp();
    pet.feed();
    pet.walk();

    expect(pet.fitness).toEqual(8);
  });
  it("does not increment fitness past 10", () => {
    const pet = new Pet("Fido");

    pet.growUp();

    pet.walk();

    expect(pet.fitness).toEqual(10);
  });
  it("throws an error if the pet is not alive", () => {
    const pet = new Pet("Fido");

    pet.fitness = 0;

    expect(() => pet.walk()).toThrow("Your pet is no longer alive :(");
  });
});

describe("hunger", () => {
  it("takes 3 away from hunger", () => {
    const pet = new Pet("Fido");

    pet.growUp();
    pet.feed();

    expect(pet.hunger).toEqual(2);
  });
  it("does not decrement hunger past 0", () => {
    const pet = new Pet("Fido");

    pet.growUp();
    pet.feed();
    pet.feed();

    expect(pet.hunger).toEqual(0);
  });
});

describe("checkUp", () => {
  it("returns feel I feel great when all ok", () => {
    const pet = new Pet("Fido");

    const result = pet.checkUp();

    expect(result).toEqual("I feel great!");
  });
  it("returns hungry when hunger is 5 or more", () => {
    const pet = new Pet("Fido");

    pet.growUp();
    const result = pet.checkUp();

    expect(result).toEqual("I am hungry");
  });
  it("returns need walk when fitness is 3 or less", () => {
    const pet = new Pet("Fido");

    pet.growUp();
    pet.feed();
    pet.growUp();
    pet.feed();
    pet.growUp();
    pet.feed();
    pet.feed();

    const result = pet.checkUp();

    expect(result).toEqual("I need a walk");
  });
  it("returns both complaints when hunger is at or above 5 and fitness at or below 3", () => {
    const pet = new Pet("Fido");

    pet.growUp();
    pet.feed();
    pet.growUp();
    pet.feed();
    pet.growUp();

    const result = pet.checkUp();

    expect(result).toEqual("I am hungry AND I need a walk");
  });
  it("your pet is no longer alive when it's dead", () => {
    const pet = new Pet("Fido");

    pet.hunger = 10;

    expect(() => pet.feed()).toThrow("Your pet is no longer alive :(");
  });
});

describe("isAlive", () => {
  it("returns true if fitness is greater than 0, hunger less than 10 and age less than 30", () => {
    const pet = new Pet("Fido");

    pet.growUp();
    pet.feed();

    expect(pet.isAlive()).toBe(true);
  });
  it("returns false if fitness is less than or at 0, hunger more than or at 10", () => {
    const pet = new Pet("Fido");

    pet.fitness = 0;
    pet.hunger = 10;

    expect(pet.isAlive()).toBe(false);
  });
  it("returns false if age greater than or at 30", () => {
    const pet = new Pet("Fido");

    pet.age = 31;

    expect(pet.isAlive()).toBe(false);
  });
  it("returns false if fitness less than or at 0", () => {
    const pet = new Pet("Fido");

    pet.fitness = -1;

    expect(pet.isAlive()).toBe(false);
  });
});

describe("adoptChild", () => {
  it("attaches child pet to parent", () => {
    const parent = new Pet("Fido");
    const child = new Pet("Rex");

    parent.adoptChild(child);

    expect(parent.children).toEqual([child]);
  });
});

describe("haveBaby", () => {
  it("spawns child pet inside parent array", () => {
    const pet = new Pet("Fido");

    pet.haveBaby("Rex");

    const child = pet.children[0];

    expect(pet.children).toContain(child);
  });
});
