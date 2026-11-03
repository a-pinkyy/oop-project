class NPC {
  name: string;
  health: number;
  speed: number;
  attack: number;
  defense: number;
  npcType: "Walk" | "Fly";

  constructor(
    name: string,
    health: number,
    speed: number,
    attack: number,
    defense: number,
    npcType: "Walk" | "Fly",
  ) {
    this.name = name;
    this.health = health;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
    this.npcType = npcType;
  }

  walking(): void {
    this.speed += 2;
    console.log(`${this.name} berjalan. Speed sekarang: ${this.speed}`);
  }

  sprint(): void {
    this.speed += 4;
    console.log(`${this.name} berlari. Speed sekarang: ${this.speed}`);
  }

  attacking(): void {
    this.attack += 2;
    console.log(`${this.name} menyerang. Attack sekarang: ${this.attack}`);
  }
  getAttacked(demage: number): void {
    this.attack -= demage;
    console.log("${this.name} menyerang. Attack sekarang: ${this.attack}");
  }

  getBuff(): void {
    this.health += this.health * 0.05;
    this.attack = this.attack += 0.1 * 100;
    console.log(`${this.health} bertambah.Attack sekarang :${this.attack}`);
  }
  getUltimate(): void {
    this.speed = this.speed * 2;
    this.attack = this.attack * 2;
    this.health -= this.health * 0.5;
    console.log(`
     kecepatan sekarang ${this.speed}. 
      Speed sekarang: ${this.attack} . 
      darah sekarang : ${this.health}`);
  }
}

const goblin = new NPC("Goblin", 1000, 5, 10, 100, "Walk");

goblin.getUltimate();
