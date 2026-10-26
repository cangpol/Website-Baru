const fs = require('fs');
const sql = fs.readFileSync('dbwebsitelama.sql', 'utf8');

const regex = /-- Table structure for table `([^`]+)`/g;
let match;
const tables = [];
while ((match = regex.exec(sql)) !== null) {
  tables.push(match[1]);
}
console.log('Tables in dbwebsitelama.sql:', tables);

// Check tables related to news, articles, posts, beritas, banners, images
tables.forEach(table => {
  const insertRegex = new RegExp(`INSERT INTO \`${table}\``, 'g');
  const count = (sql.match(insertRegex) || []).length;
  console.log(`Table: ${table} (has inserts: ${count > 0})`);
});

