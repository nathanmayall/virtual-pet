function Pet(name) {
  this.name = name;
  this.age = 0;
  this.hunger = 0;
  this.fitness = 10;
}

Pet.prototype.growUp = function () {
  this.age += 1;
  this.hunger += 5;
  this.fitness -= 3;
};

Pet.prototype.walk = function () {
  this.fitness <= 6 ? (this.fitness += 4) : (this.fitness = 10);
};

Pet.prototype.feed = function () {
  this.hunger >= 3 ? (this.hunger -= 3) : (this.hunger = 0);
};

Pet.prototype.checkUp = function () {
  if (this.fitness <= 3 && this.hunger >= 5)
    return "I am hungry AND I need a walk";

  if (this.fitness <= 3) return "I need a walk";

  if (this.hunger >= 5) return "I am hungry";

  return "I feel great!";
};

module.exports = Pet;
