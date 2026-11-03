// Jalankan: npx tsx 02-perpustakaan-lengkap.ts
// =====================================================================
// LATIHAN PERTEMUAN 2 + 3 (satu file, pertemuan 3 melanjutkan pertemuan 2)
//
// Penanda di komentar:
//   [P2]       = kode dari pertemuan 2, tidak berubah
//   [DIUBAH]   = kode pertemuan 2 yang diubah di pertemuan 3
//   [BARU P3]  = kode baru di pertemuan 3
// =====================================================================

// ===== [BARU P3] ABSTRACT CLASS: induk dari Book dan Magazine =====
// Isinya DIPINDAH dari class Book pertemuan 2 (title, stock, borrow, giveBack).
abstract class LibraryItem {
  title: string;
  stock: number;
  protected loanDays: number; // [BARU P3] protected: boleh dipakai class turunan

  constructor(title: string, stock: number, loanDays: number) {
    this.title = title;
    this.stock = stock;
    this.loanDays = loanDays;
  }

  // [P2] dulu ada di Book, sekarang pindah ke induk
  borrow() {
    if (this.stock === 0) {
      throw new Error("Stok " + this.title + " habis");
    }
    this.stock = this.stock - 1;
  }

  // [P2] dulu ada di Book, sekarang pindah ke induk
  giveBack() {
    this.stock = this.stock + 1;
  }

  // [BARU P3]
  getInfo(): string {
    return this.title + ", dipinjam " + this.loanDays + " hari";
  }

  // [BARU P3] method abstract: tanpa isi, anak WAJIB mengisinya
  abstract calculateFine(daysLate: number): number;
}

// ===== [DIUBAH] class Book sekarang MEWARISI LibraryItem =====
// Dulu: class Book { title; stock; constructor; borrow; giveBack }
// Sekarang: title, stock, borrow, giveBack diwarisi dari LibraryItem.
class Book extends LibraryItem {
  author: string; // [BARU P3] atribut khusus Book

  constructor(title: string, author: string, stock: number) {
    super(title, stock, 7); // buku dipinjam 7 hari
    this.author = author;
  }

  calculateFine(daysLate: number): number {
    return daysLate * 1000; // Rp1.000 per hari
  }
}

// ===== [BARU P3] class Magazine =====
class Magazine extends LibraryItem {
  constructor(title: string, stock: number) {
    super(title, stock, 3); // majalah dipinjam 3 hari
  }

  calculateFine(daysLate: number): number {
    return daysLate * 500; // Rp500 per hari
  }
}

// ===== [DIUBAH] class Member =====
// Perubahan: tipe Book diganti LibraryItem supaya bisa meminjam Book DAN Magazine.
// Logika (maksimal 3, push, indexOf, splice) sama persis dengan pertemuan 2.
class Member {
  name: string;
  studentId: string;
  private borrowedBooks: LibraryItem[] = []; // [DIUBAH] Book[] -> LibraryItem[]

  constructor(name: string, studentId: string) {
    this.name = name;
    this.studentId = studentId;
  }

  borrow(book: LibraryItem) { // [DIUBAH] (book: Book) -> (book: LibraryItem)
    if (this.borrowedBooks.length >= 3) {
      throw new Error(this.name + " sudah meminjam 3 buku, tidak boleh lebih");
    }
    book.borrow();
    this.borrowedBooks.push(book);
  }

  returnBook(book: LibraryItem) { // [DIUBAH] (book: Book) -> (book: LibraryItem)
    const posisi = this.borrowedBooks.indexOf(book);
    if (posisi === -1) {
      throw new Error(this.name + " tidak meminjam buku " + book.title);
    }
    this.borrowedBooks.splice(posisi, 1);
    book.giveBack();
  }

  countBorrowed() {
    return this.borrowedBooks.length;
  }
}

// ===== [BARU P3] INTERFACE Notifier + 2 implementasi =====
interface Notifier {
  send(to: string, message: string): void;
}

class EmailNotifier implements Notifier {
  send(to: string, message: string) {
    console.log("[EMAIL] ke " + to + ": " + message);
  }
}

class WhatsAppNotifier implements Notifier {
  send(to: string, message: string) {
    console.log("[WA] ke " + to + ": " + message);
  }
}

// ===== [BARU P3] LoanService + Dependency Injection =====
class LoanService {
  private notifier: Notifier; // bertipe interface, bukan EmailNotifier

  constructor(notifier: Notifier) {
    this.notifier = notifier; // disuntik dari luar lewat constructor
  }

  borrow(member: Member, item: LibraryItem) {
    member.borrow(item);
    this.notifier.send(member.name, "Anda meminjam " + item.title);
  }

  returnItem(member: Member, item: LibraryItem) {
    member.returnBook(item);
    this.notifier.send(member.name, "Anda mengembalikan " + item.title);
  }
}

// =====================================================================
// PENGUJIAN BAGIAN 1: pengujian pertemuan 2 (tetap jalan setelah diubah)
// =====================================================================
console.log("########## PENGUJIAN PERTEMUAN 2 ##########");

const book1 = new Book("Laskar Pelangi", "Andrea Hirata", 5); // [DIUBAH] ada author
const book2 = new Book("Sang Pemimpi", "Andrea Hirata", 5);
const book3 = new Book("Edensor", "Andrea Hirata", 1);

const budi = new Member("Budi", "2024001");
const sari = new Member("Sari", "2024002");

console.log("--- 1. Budi pinjam 3 buku ---");
budi.borrow(book1);
budi.borrow(book2);
budi.borrow(book3);
console.log("Jumlah pinjaman Budi:", budi.countBorrowed());
console.log("Stok:", book1.stock, book2.stock, book3.stock);

console.log("--- 2. Budi coba pinjam buku ke-4 ---");
try {
  budi.borrow(book1);
} catch (e) {
  console.log("Error:", (e as Error).message);
}

console.log("--- 3. Sari coba pinjam Edensor (stok 0) ---");
try {
  sari.borrow(book3);
} catch (e) {
  console.log("Error:", (e as Error).message);
}

console.log("--- 4. Budi kembalikan Edensor ---");
budi.returnBook(book3);
console.log("Stok Edensor:", book3.stock);
console.log("Jumlah pinjaman Budi:", budi.countBorrowed());

console.log("--- 5. Sari pinjam Edensor, sekarang bisa ---");
sari.borrow(book3);
console.log("Jumlah pinjaman Sari:", sari.countBorrowed());
console.log("Stok Edensor:", book3.stock);

console.log("--- 6. Sari kembalikan buku yang tidak dia pinjam ---");
try {
  sari.returnBook(book1);
} catch (e) {
  console.log("Error:", (e as Error).message);
}

// =====================================================================
// PENGUJIAN BAGIAN 2: pengujian pertemuan 3
// =====================================================================
console.log("\n########## PENGUJIAN PERTEMUAN 3 ##########");

// const x = new LibraryItem("X", 1, 1);  // hapus tanda // -> ERROR: abstract class

const tempo = new Magazine("Tempo", 3);

console.log("--- 7. Polymorphism: calculateFine ---");
console.log(book1.getInfo());
console.log(tempo.getInfo());
const items: LibraryItem[] = [book1, tempo];
for (const item of items) {
  console.log(item.title + " telat 2 hari -> Rp" + item.calculateFine(2));
}

console.log("--- 8. LoanService dengan EmailNotifier ---");
const rina = new Member("Rina", "2024003");
const serviceEmail = new LoanService(new EmailNotifier());
serviceEmail.borrow(rina, book1);
serviceEmail.borrow(rina, tempo);

console.log("--- 9. Ganti ke WhatsAppNotifier, LoanService TIDAK diubah ---");
const serviceWA = new LoanService(new WhatsAppNotifier());
serviceWA.returnItem(rina, tempo);
serviceWA.borrow(rina, tempo);

// =====================================================================
// [BARU] KOMPOSISI (has-a): Loan MEMILIKI Member dan LibraryItem
// Hubungannya bukan "adalah", jadi bukan inheritance, tapi atribut.
// =====================================================================
class Loan {
  member: Member;
  item: LibraryItem;

  constructor(member: Member, item: LibraryItem) {
    this.member = member;
    this.item = item;
  }

  getInfo(): string {
    return this.member.name + " meminjam " + this.item.title;
  }
}

console.log("\n########## KOMPOSISI ##########");
const loan = new Loan(rina, tempo);
console.log(loan.getInfo()); // Rina meminjam Tempo