class Hero {
  health: number;
  attack: number;
  magicalDefense: number;
  pysicalDefense: number;
  basicAttack: number;

  constructor(
    health: number,
    attack: number,
    magicalDefense: number,
    pysicalDefense: number,
    basicAttack: number,
  ) {
    this.health = health;
    this.attack = attack;
    this.magicalDefense = magicalDefense;
    this.pysicalDefense = pysicalDefense;
    this.basicAttack = basicAttack;
  }

  getHealth() {
    return `This Health ${this.health}`;
  }
}

class Fighter extends Hero {
  spellVamp: number;

  constructor(
    health: number,
    attack: number,
    magicalDefense: number,
    pysicalDefense: number,
    basicAttack: number,
  ) {
    super(health, attack, magicalDefense, pysicalDefense, basicAttack);
    this.spellVamp = 10;
  }
}

class Mage extends Hero {
  magicalAttack: number;

  constructor(
    health: number,
    attack: number,
    magicalDefense: number,
    pysicalDefense: number,
    basicAttack: number,
  ) {
    super(health, attack, magicalDefense, pysicalDefense, basicAttack);
    this.magicalAttack = 10;
  }
}

class Support extends Hero {
  constructor(
    health: number,
    attack: number,
    magicalDefense: number,
    pysicalDefense: number,
    basicAttack: number,
  ) {
    super(health, attack, magicalDefense, pysicalDefense, basicAttack);
  }

  healing() {
    return (this.health += 10);
  }
}

const support = new Support(100, 100, 100, 100, 100);
support.getHealth();
