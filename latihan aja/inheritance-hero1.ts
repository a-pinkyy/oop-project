class Hero {
  hp: number;
  lvl: number;
  speed: number;
  attackpower: number;
  attackspeed: number;
  physicaldefence: number;
  magicaldefence: number;
  distance: number;

  constructor(
    hp: number,
    lvl: number,
    speed: number,
    attackpower: number,
    attackspeed: number,
    physicaldefence: number,
    magicaldefence: number,
    distance: number
  ) {
    this.hp = hp;
    this.lvl = lvl;
    this.speed = speed;
    this.attackpower = attackpower;
    this.attackspeed = attackspeed;
    this.physicaldefence = physicaldefence;
    this.magicaldefence = magicaldefence;
    this.distance = distance;
  }

  firstskill() : string {
    return "this is first skill in general hero ";
  }
  secondskill() {}
  ultimate() {}
}

class Marksman extends Hero {
  constructor(hp: number) {

    super(hp, 10, 30, 1, 10, 10, 5, 5);
  }
   firstskill() : string {
    return "this is first skill in general marksman hero ";
  }
}

const miya = new Marksman(2250);
const layla = new Marksman(2350);

console.log(miya.hp); 
console.log(layla.hp); 
console.log(miya.firstskill());

class Jungle extends Hero {}

class Mage extends Hero {
  magicdamage: number = 10;
}

class Fighter extends Hero {
  physicaldamage: number = 10;
  spellvamp: number = 10;
}


class Tank extends Hero {}

class Support extends Hero {
  healingpower: number = 10;
}


class yuzhong extends fighter {
  constructor(hp: number) {

    super(hp, 10, 30, 1, 10, 10, 5, 5);
  }
   thirdskill() : string {
    return "this is third skill in yuzhong ";
  }
}
const yuzhong1 = new Yuzhong(22000);
console.log(yuzhong.hp); 

console.log(yuzhong.thirdskill());

 