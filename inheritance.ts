class Hero {
  health: number = 100;
  speed: number = 100;
  magicalDefense: number = 100;
  physcialDefense: number = 100;
  pysichal_d3f3nse: number = 100;
  basicAttack: number = 100;

  getInformationHero(): string {
    return `Darahnya ${this.health}, Speed ${this.speed}`;
  }

  getAttacked(damage: number): void {
    this.health = this.health - damage;

    return console.log(this.health);
  }
}

const hero = new Hero();

hero.getAttacked(20);
