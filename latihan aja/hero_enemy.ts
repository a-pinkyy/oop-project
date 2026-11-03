// =====================================================================
// 03. INHERITANCE, OVERRIDING, POLYMORPHISM (contoh Hero dan Enemy dosen)
// Jalankan: npx tsx 03-inheritance-hero-enemy.ts
// =====================================================================

// ---------- A. HERO (induk) dan turunannya ----------
class Hero {
  health: number;
  attack: number;
  magicalDefense: number;
  physicalDefense: number;
  basicAttack: number;

  constructor(
    health: number,
    attack: number,
    magicalDefense: number,
    physicalDefense: number,
    basicAttack: number,
  ) {
    this.health = health;
    this.attack = attack;
    this.magicalDefense = magicalDefense;
    this.physicalDefense = physicalDefense;
    this.basicAttack = basicAttack;
  }

  getHealth(): string {
    return `This Health ${this.health}`;
  }

  // health berkurang saat diserang
  getAttacked(damage: number): void {
    this.health = this.health - damage;
    console.log(`Diserang ${damage}. Health sekarang ${this.health}`);
  }
}

// Fighter punya atribut tambahan spellVamp
class Fighter extends Hero {
  spellVamp: number;

  constructor(
    health: number,
    attack: number,
    magicalDefense: number,
    physicalDefense: number,
    basicAttack: number,
  ) {
    super(health, attack, magicalDefense, physicalDefense, basicAttack); // wajib duluan
    this.spellVamp = 10;
  }
}

// Mage punya atribut tambahan magicalAttack
class Mage extends Hero {
  magicalAttack: number;

  constructor(
    health: number,
    attack: number,
    magicalDefense: number,
    physicalDefense: number,
    basicAttack: number,
  ) {
    super(health, attack, magicalDefense, physicalDefense, basicAttack);
    this.magicalAttack = 10;
  }
}

// Support punya method tambahan healing()
class Support extends Hero {
  healing(): void {
    this.health += 10;
    console.log(`Healing. Health sekarang ${this.health}`);
  }
}

const support = new Support(100, 100, 100, 100, 100);
console.log(support.getHealth()); // method warisan dari Hero
support.getAttacked(30); // warisan: 100 - 30 = 70
support.healing(); // method milik Support: 80

const fighter = new Fighter(200, 50, 20, 30, 10);
console.log("spellVamp Fighter:", fighter.spellVamp); // 10

// ---------- B. ENEMY (Tugas 1): OVERRIDING + POLYMORPHISM ----------
class Enemy {
  health: number;

  constructor(health: number) {
    this.health = health;
  }

  baseHealth(): number {
    return this.health;
  }
}

// override: anak menulis ulang method induk
class Minions extends Enemy {
  constructor(health: number) {
    super(health);
  }
  baseHealth(): number {
    return this.health + 30; // tidak mengubah this.health, hanya menghitung
  }
}

class MinionFighter extends Enemy {
  constructor(health: number) {
    super(health);
  }
  baseHealth(): number {
    return this.health + 50;
  }
}

class Lord extends Enemy {
  constructor(health: number) {
    super(health);
  }
  baseHealth(): number {
    return this.health + 300;
  }
}

// POLYMORPHISM: array bertipe induk, isinya berbagai anak
const enemies: Enemy[] = [new Minions(10), new MinionFighter(100), new Lord(1000)];
for (const e of enemies) {
  console.log(e.constructor.name, "->", e.baseHealth()); // versi milik object aslinya
}