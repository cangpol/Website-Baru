const fs = require('fs');
const sql = fs.readFileSync('dbwebsitelama.sql', 'utf8');
const lines = sql.split('\n');

const beritaLines = lines.filter(l => l.trim().startsWith('(') && (l.includes('Kemahasiswaan') || l.includes('Prestasi') || l.includes('Akademik') || l.includes('Kerjasama') || l.includes('Dies Natalis') || l.includes('Umum')));

console.log('Total berita rows found by pattern:', beritaLines.length);

beritaLines.forEach((l, idx) => {
  // Let's find images/thumbnails
  const imgMatches = l.match(/'([^']*\.(?:jpg|jpeg|png|webp|svg|gif)[^']*)'/gi) || [];
  console.log(`[${idx+1}] images found:`, imgMatches);
});

