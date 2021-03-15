function Pet(name) {
  this.name = name;
  this.age = 0;
  this.hunger = 0;
  this.fitness = 10;
  this.children = [];
  this.isAlive = function () {
    return this.fitness > 0 && this.hunger < 10 && this.age < 30 ? true : false;
  };
  this.adoptChild = function (child) {
    this.children.push(child);
  };
  this.haveBaby = function (child) {
    this.children.push(new Pet(child));
  };
}

Pet.prototype.growUp = function () {
  if (!this.isAlive()) throw new Error("Your pet is no longer alive :(");
  this.age += 1;
  this.hunger += 5;
  this.fitness -= 3;
};

Pet.prototype.walk = function () {
  if (!this.isAlive()) throw new Error("Your pet is no longer alive :(");
  this.fitness <= 6 ? (this.fitness += 4) : (this.fitness = 10);
};

Pet.prototype.feed = function () {
  if (!this.isAlive()) throw new Error("Your pet is no longer alive :(");
  this.hunger >= 3 ? (this.hunger -= 3) : (this.hunger = 0);
};

Pet.prototype.checkUp = function () {
  if (!this.isAlive()) return "Your pet is no longer alive :(";

  if (this.fitness <= 3 && this.hunger >= 5)
    return "I am hungry AND I need a walk";

  if (this.fitness <= 3) return "I need a walk";

  if (this.hunger >= 5) return "I am hungry";

  return "I feel great!";
};

module.exports = Pet;
