// =====================================================================
//  SOAL: Mario Bros dengan OOP (TypeScript)
// =====================================================================
//  Mario memiliki atribut: HP, speed, positionX, positionY, invincible,
//  currentForm. Mario dapat berubah menjadi 3 form: 'mario',
//  'super mario', dan 'fire mario'.
//
//  Default: HP = 1, speed = 5, currentForm = 'mario', invincible = false,
//           positionX = 0, positionY = 0
//
//  1. SuperMushroom (Jamur): Mario menjadi Super Mario, HP + 1.
//  2. FireFlower (Bunga): Mario menjadi Fire Mario, HP + 1,
//     dan dapat menembakkan bola api.
//  3. SuperStar (Bintang): Mario kebal terhadap serangan.
//  4. Diserang: HP - 1 dan kembali ke form 'mario'.
//     Jika sedang kebal, serangan tidak berpengaruh.
//  5. Bergerak ke kanan: positionX + speed.
//  6. Bergerak ke kiri: positionX - speed.
//
//  Buat class, attribute, method, dan object.
//  Terapkan inheritance dan polymorphism.
// =====================================================================

// Kerjakan Quiznya Disini
// =====================================================================
// 05. KUIS MARIO BROS (soal di quiz-1/quiz.ts)
// Jalankan: npx tsx 05-mario-quiz.ts
// =====================================================================

type MarioForm = "mario" | "super mario" | "fire mario";

class Mario {
  hp: number;
  speed: number;
  positionX: number;
  positionY: number;
  invincible: boolean;
  currentForm: MarioForm;

  constructor(
    hp: number = 1,
    speed: number = 5,
    positionX: number = 0,
    positionY: number = 0,
    invincible: boolean = false,
    currentForm: MarioForm = "mario",
  ) {
    this.hp = hp;
    this.speed = speed;
    this.positionX = positionX;
    this.positionY = positionY;
    this.invincible = invincible;
    this.currentForm = currentForm;
  }

 
  moveRight(): void {
    this.positionX += this.speed;
    console.log(`Mario ke kanan. positionX sekarang ${this.positionX}`);
  }

  
  moveLeft(): void {
    this.positionX -= this.speed;
    console.log(`Mario ke kiri. positionX sekarang ${this.positionX}`);
  }

  getAttacked(): void {
    if (this.invincible) {
      console.log("Mario kebal! Serangan tidak berpengaruh.");
      return;
    }
    this.hp -= 1;
    this.currentForm = "mario";
    console.log(`Mario diserang. HP sekarang ${this.hp}, form kembali ke "${this.currentForm}"`);
    if (this.hp <= 0) {
      console.log("Mario kalah. Game over!");
    }
  }

  shootFireball(): void {
    if (this.currentForm !== "fire mario") {
      console.log(`Form "${this.currentForm}" tidak bisa menembakkan bola api.`);
      return;
    }
    console.log("Mario menembakkan bola api!");
  }
  collect(item: PowerUp): void {
    item.applyTo(this);
  }

  getInfo(): void {
    console.log(
      `Mario | HP ${this.hp} | speed ${this.speed} | posisi (${this.positionX}, ${this.positionY}) | kebal ${this.invincible} | form "${this.currentForm}"`,
    );
  }
}


abstract class PowerUp {
  abstract applyTo(mario: Mario): void; 
}


class SuperMushroom extends PowerUp {
  applyTo(mario: Mario): void {
    mario.currentForm = "super mario";
    mario.hp += 1;
    console.log(`Mario makan SuperMushroom. Form "${mario.currentForm}", HP ${mario.hp}`);
  }
}

class FireFlower extends PowerUp {
  applyTo(mario: Mario): void {
    mario.currentForm = "fire mario";
    mario.hp += 1;
    console.log(`Mario ambil FireFlower. Form "${mario.currentForm}", HP ${mario.hp}. Bisa menembakkan bola api!`);
  }
}


class SuperStar extends PowerUp {
  applyTo(mario: Mario): void {
    mario.invincible = true;
    console.log("Mario ambil SuperStar. Mario kebal!");
  }
}


const mario = new Mario();
mario.getInfo();

console.log("\n--- bergerak ---");
mario.moveRight(); 
mario.moveRight(); 
mario.moveLeft(); 

console.log("\n--- form mario belum bisa tembak ---");
mario.shootFireball();

console.log("\n--- SuperMushroom ---");
mario.collect(new SuperMushroom()); 
mario.getAttacked(); 

console.log("\n--- FireFlower ---");
mario.collect(new FireFlower()); 
mario.shootFireball();

console.log("\n--- SuperStar ---");
mario.collect(new SuperStar());
mario.getAttacked(); 
mario.invincible = false; 
mario.getAttacked(); 
mario.getAttacked(); 

console.log("\n--- polymorphism: array PowerUp ---");
const mario2 = new Mario();
const items: PowerUp[] = [new SuperMushroom(), new FireFlower(), new SuperStar()];
for (const item of items) {
  mario2.collect(item); 
mario2.getInfo();
