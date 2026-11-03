// =====================================================================
// 01. DASAR: TIPE DATA, CLASS, OBJECT, CONSTRUCTOR, METHOD, ENCAPSULATION
// Jalankan: npx tsx 01-dasar-class-encapsulation.ts
// =====================================================================

// ---------- 1. TIPE DATA ----------
let title: string = "Laskar Pelangi"; // teks
let stock: number = 5; // angka
let isAvailable: boolean = true; // true / false
let authors: string[] = ["Andrea Hirata", "John Doe"]; // array berisi string
let bookStatus: "available" | "borrowed" = "available"; // union: hanya 2 nilai ini (diberi nama bookStatus karena "status" bentrok dengan bawaan browser)

function getName(): string {
  return "Fathir"; // fungsi yang mengembalikan string
}

function getAllBooks(): (string | number | boolean)[] {
  return ["Laskar Pelangi", "Sang Pemimpi", 1, true]; // array campuran
}

console.log(title, stock, isAvailable, authors, bookStatus);
console.log(getName(), getAllBooks());

// ---------- 2. CLASS, OBJECT, CONSTRUCTOR, METHOD ----------
class Book {
  // atribut
  title: string;
  authors: string[];
  pages: number;
  stock: number;

  // constructor: jalan otomatis saat new Book(...)
  constructor(title: string, authors: string[], pages: number, stock: number) {
    this.title = title; // this = object yang sedang dibuat
    this.authors = authors;
    this.pages = pages;
    this.stock = stock;
  }

  // method
  getInfo(): void {
    console.log(
      `Title: ${this.title}, Authors: ${this.authors.join(", ")}, Pages: ${this.pages}, Stock: ${this.stock}`,
    );
  }

  borrow(): void {
    if (this.stock === 0) {
      throw new Error("Stok habis"); // tolak aksi yang tidak valid
    }
    this.stock--;
  }

  giveBack(): void {
    this.stock++;
  }
}

// object dari class Book
const novelBook = new Book("Laskar Pelangi", ["Andrea Hirata"], 350, 5);
novelBook.getInfo();
novelBook.borrow();
console.log("Stok setelah dipinjam:", novelBook.stock); // 4

// ---------- 3. BENTUK SINGKAT (parameter properties) ----------
// "public" di depan parameter = atribut dibuat dan diisi otomatis
class BookShort {
  constructor(
    public title: string,
    public stock: number,
  ) {}
}
const b2 = new BookShort("Sang Pemimpi", 3);
console.log(b2.title, b2.stock);

// ---------- 4. ENCAPSULATION: private, getter, setter, readonly ----------
// public    : bisa diakses dari mana saja
// private   : hanya di dalam class itu sendiri
// protected : di dalam class dan class turunannya
// readonly  : nilai tidak bisa diubah setelah diisi
class BookSafe {
  private _stock: number = 0; // disembunyikan dari luar
  readonly isbn: string; // tidak boleh diubah lagi

  constructor(
    public title: string,
    isbn: string,
  ) {
    this.isbn = isbn;
  }

  // getter: dibaca dengan  book.stock
  get stock(): number {
    return this._stock;
  }

  // setter: diubah dengan  book.stock = 10  (ada validasi)
  set stock(n: number) {
    if (n < 0) {
      throw new Error("Stok tidak boleh negatif");
    }
    this._stock = n;
  }
}

const safe = new BookSafe("Edensor", "978-1");
safe.stock = 10; // lewat setter
console.log("Stok safe:", safe.stock); // lewat getter -> 10

// ---------- 5. try / catch: menangkap Error ----------
try {
  safe.stock = -5; // ditolak setter
} catch (e) {
  console.log("Error:", (e as Error).message);
}
// safe.isbn = "999";   // ERROR: readonly tidak bisa diubah
// safe._stock = 5;     // ERROR: private tidak bisa diakses dari luar

try {
  const kosong = new Book("Kosong", ["A"], 100, 0);
  kosong.borrow(); // stok 0 -> Error
} catch (e) {
  console.log("Error:", (e as Error).message);
}