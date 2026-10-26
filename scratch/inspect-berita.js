const fs = require('fs');
const sql = fs.readFileSync('dbwebsitelama.sql', 'utf8');

// Find CREATE TABLE for berita
const beritaCreate = sql.match(/CREATE TABLE `berita`[^;]+;/s);
console.log('--- BERITA SCHEMA ---');
console.log(beritaCreate ? beritaCreate[0] : 'Not found');

// Find INSERT INTO `berita`
const beritaInsert = sql.match(/INSERT INTO `berita`[^;]+;/gs);
console.log('\n--- BERITA INSERTS COUNT ---', beritaInsert ? beritaInsert.length : 0);
if (beritaInsert) {
  beritaInsert.forEach((ins, idx) => {
    console.log(`\nInsert #${idx + 1}:\n`, ins.substring(0, 1000) + (ins.length > 1000 ? '...' : ''));
  });
}

