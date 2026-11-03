// Ini Tugas

class Enemy {
  health: number;

  constructor(health: number) {
    this.health = health;
  }

  baseHealth(): number {
    return this.health;
  }
}

class Minions extends Enemy {
  constructor(health: number) {
    super(health);
  }

  baseHealth(): number {
    return (this.health += 30);
  }
}

class MinionFighter extends Enemy {}

class MinionArcher extends Enemy {}

class MinionMage extends Enemy {}

class SuperMinion extends Enemy {}

class Lord extends Enemy {}

class Turtle extends Enemy {}

class RedDragon extends Enemy {}

class BlueWolf extends Enemy {}

const minion = new Minions(10);
console.log(minion.baseHealth());
