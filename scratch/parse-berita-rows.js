const fs = require('fs');
const sql = fs.readFileSync('dbwebsitelama.sql', 'utf8');

// Parse INSERT INTO `berita`
// Note: Each INSERT INTO statement can have multiple rows or there are 3 statements
const beritaInserts = sql.match(/INSERT INTO `berita`[^;]+;/gs) || [];

console.log('Total insert statements for berita:', beritaInserts.length);

beritaInserts.forEach((stmt, sIdx) => {
  console.log(`\n=== STATEMENT ${sIdx + 1} ===`);
  // Let's extract values
  // We can write a custom regex or parser for SQL values
});

// Let's write a mini parser for MySQL VALUES in berita
const re = /\((\d+),\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*'([^']*)',\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'((?:\\'|[^'])*)'|NULL),\s*'([^']*)',\s*(\d+),\s*(\d+),/g;

let count = 0;
for (const stmt of beritaInserts) {
  let m;
  while ((m = re.exec(stmt)) !== null) {
    count++;
    console.log(`\n--- BERITA #${count} (ID: ${m[1]}) ---`);
    console.log(`Title: ${m[2]}`);
    console.log(`Slug: ${m[3]}`);
    console.log(`Category: ${m[4]}`);
    console.log(`Date: ${m[5]}`);
    console.log(`Thumbnail: ${m[8]}`);
    console.log(`Excerpt: ${m[6].substring(0, 120)}...`);
    console.log(`Content length: ${m[7].length} chars`);
  }
}
console.log(`\nTotal parsed berita: ${count}`);

