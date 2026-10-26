const fs = require('fs');
const sql = fs.readFileSync('dbwebsitelama.sql', 'utf8');

// Find start of INSERT INTO `berita`
let searchPos = 0;
const articles = [];

while (true) {
  const insertIdx = sql.indexOf("INSERT INTO `berita`", searchPos);
  if (insertIdx === -1) break;
  
  const endIdx = sql.indexOf(";", insertIdx);
  if (endIdx === -1) break;
  
  const statement = sql.substring(insertIdx, endIdx);
  searchPos = endIdx + 1;
  
  // Extract columns
  const colsMatch = statement.match(/INSERT INTO `berita` \(([^)]+)\) VALUES/);
  if (!colsMatch) continue;
  const cols = colsMatch[1].split(',').map(c => c.trim().replace(/`/g, ''));
  
  // Now parse tuples
  const valuesPart = statement.substring(statement.indexOf("VALUES") + 6).trim();
  
  // Simple state machine for SQL values
  let inString = false;
  let escape = false;
  let currentVal = '';
  let row = [];
  let inRow = false;
  
  for (let i = 0; i < valuesPart.length; i++) {
    const char = valuesPart[i];
    
    if (escape) {
      currentVal += char;
      escape = false;
      continue;
    }
    
    if (char === '\\') {
      escape = true;
      continue;
    }
    
    if (char === "'") {
      inString = !inString;
      continue;
    }
    
    if (!inString) {
      if (char === '(') {
        inRow = true;
        row = [];
        currentVal = '';
        continue;
      } else if (char === ')') {
        row.push(currentVal.trim() === 'NULL' ? null : currentVal);
        inRow = false;
        
        // Map to object
        const obj = {};
        cols.forEach((col, idx) => {
          obj[col] = row[idx];
        });
        articles.push(obj);
        currentVal = '';
        continue;
      } else if (char === ',') {
        if (inRow) {
          row.push(currentVal.trim() === 'NULL' ? null : currentVal);
          currentVal = '';
          continue;
        }
      }
    }
    
    currentVal += char;
  }
}

console.log(`Successfully extracted ${articles.length} berita articles:`);
articles.forEach((a, i) => {
  console.log(`\n[${i + 1}] ID: ${a.id} | Date: ${a.date} | Category: ${a.category} | Status: ${a.status}`);
  console.log(`    Title: ${a.title}`);
  console.log(`    Slug: ${a.slug}`);
  console.log(`    Thumbnail: ${a.thumbnail}`);
  console.log(`    Excerpt: ${a.excerpt ? a.excerpt.substring(0, 100) : ''}...`);
  console.log(`    Content length: ${a.content ? a.content.length : 0} chars`);
});

fs.writeFileSync('scratch/extracted-berita.json', JSON.stringify(articles, null, 2));
console.log('\nSaved full data to scratch/extracted-berita.json');

