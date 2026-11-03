// =====================================================================
// 04. NPC DENGAN 10 ATRIBUT + method + inheritance + polymorphism
// Jalankan: npx tsx 04-npc-10-atribut.ts
// =====================================================================

class NPC {
  // ---------- 10 ATRIBUT ----------
  name: string;
  health: number;
  maxHealth: number;
  mana: number;
  speed: number;
  attack: number;
  defense: number;
  level: number;
  npcType: "Walk" | "Fly";
  isAlive: boolean;

  constructor(
    name: string,
    health: number,
    mana: number,
    speed: number,
    attack: number,
    defense: number,
    npcType: "Walk" | "Fly",
  ) {
    this.name = name;
    this.health = health;
    this.maxHealth = health; // darah maksimal = darah awal
    this.mana = mana;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
    this.level = 1; // nilai default
    this.npcType = npcType;
    this.isAlive = true; // nilai default
  }

  // speed + 2
  walking(): void {
    this.speed += 2;
    console.log(`${this.name} berjalan. Speed sekarang: ${this.speed}`);
  }

  // speed + 4
  sprint(): void {
    this.speed += 4;
    console.log(`${this.name} berlari. Speed sekarang: ${this.speed}`);
  }

  // attack + 2
  attacking(): void {
    this.attack += 2;
    console.log(`${this.name} menyerang. Attack sekarang: ${this.attack}`);
  }

  // health berkurang sebesar damage, tidak boleh di bawah 0
  getAttacked(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
    }
    console.log(`${this.name} terkena ${damage} damage. Health sekarang: ${this.health}`);
    if (!this.isAlive) {
      console.log(`${this.name} kalah!`);
    }
  }

  // menyerang NPC lain: damage = attack - defense lawan (minimal 0)
  attackTarget(target: NPC): void {
    let damage = this.attack - target.defense;
    if (damage < 0) {
      damage = 0;
    }
    console.log(`${this.name} menyerang ${target.name}`);
    target.getAttacked(damage);
  }

  // buff: attack naik 10 persen, health naik 5 persen
  getBuff(): void {
    this.attack += (this.attack * 10) / 100;
    this.health += (this.health * 5) / 100;
    console.log(
      `${this.name} mendapat buff. Attack sekarang: ${this.attack}, Health sekarang: ${this.health}`,
    );
  }

  // ultimate: speed x2, attack x2, health berkurang 50 persen
  getUltimate(): void {
    this.speed = this.speed * 2;
    this.attack = this.attack * 2;
    this.health -= (this.health * 50) / 100;
    console.log(
      `${this.name} ULTIMATE! Speed: ${this.speed}, Attack: ${this.attack}, Health: ${this.health}`,
    );
  }

  // menyembuhkan, tidak boleh melebihi maxHealth
  heal(amount: number): void {
    this.health += amount;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
    console.log(`${this.name} sembuh. Health sekarang: ${this.health}`);
  }

  levelUp(): void {
    this.level += 1;
    this.attack += 5;
    this.defense += 2;
    this.maxHealth += 20;
    console.log(`${this.name} naik ke level ${this.level}`);
  }

  getInfo(): void {
    console.log(
      `[${this.npcType}] ${this.name} | Lv ${this.level} | HP ${this.health}/${this.maxHealth} | MP ${this.mana} | SPD ${this.speed} | ATK ${this.attack} | DEF ${this.defense} | ${this.isAlive ? "hidup" : "mati"}`,
    );
  }
}

// ---------- INHERITANCE + OVERRIDING ----------
class Goblin extends NPC {
  constructor(name: string) {
    super(name, 100, 20, 5, 10, 5, "Walk"); // wajib duluan
  }

  // override: ultimate Goblin berbeda
  getUltimate(): void {
    this.attack = this.attack * 3;
    console.log(`${this.name} mengamuk! Attack sekarang: ${this.attack}`);
  }
}

class Dragon extends NPC {
  constructor(name: string) {
    super(name, 500, 100, 8, 40, 20, "Fly");
  }

  // override + memanggil versi induk lewat super
  getUltimate(): void {
    super.getUltimate(); // jalankan dulu ultimate milik NPC
    this.defense += 10; // lalu tambahan khusus Dragon
    console.log(`${this.name} menyemburkan api! Defense sekarang: ${this.defense}`);
  }
}

// ---------- PENGUJIAN ----------
const goblin = new Goblin("Goblin");
const dragon = new Dragon("Naga");

goblin.getInfo();
dragon.getInfo();

console.log("\n--- aksi dasar ---");
goblin.walking(); // 5 -> 7
goblin.sprint(); // 7 -> 11
goblin.attacking(); // 10 -> 12
goblin.getBuff(); // attack 13.2, health 105

console.log("\n--- pertarungan ---");
dragon.attackTarget(goblin); // 40 - 5 = 35 -> 105 - 35 = 70
dragon.attackTarget(goblin); // 70 - 35 = 35
dragon.attackTarget(goblin); // 35 - 35 = 0 -> kalah
goblin.getInfo();

console.log("\n--- heal dan level up ---");
dragon.getAttacked(100);
dragon.heal(50);
dragon.heal(9999); // dibatasi maxHealth
dragon.levelUp();
dragon.getInfo();

// ---------- POLYMORPHISM ----------
console.log("\n--- polymorphism: getUltimate() sama, hasil beda ---");
const npcs: NPC[] = [new NPC("Slime", 50, 0, 3, 5, 0, "Walk"), new Goblin("Goblin B"), new Dragon("Naga B")];
for (const n of npcs) {
  n.getUltimate();
}