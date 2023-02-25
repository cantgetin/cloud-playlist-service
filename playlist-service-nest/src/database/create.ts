import * as fs from 'fs';
import * as sqlite3 from 'sqlite3';

// Set the path and name of your SQLite database
const dbFile: string = 'playlist.db';

// Check if the database file already exists
if (fs.existsSync(dbFile)) {
  console.log('Database file exists.');
} else {
  // Create a new database file if it doesn't exist
  console.log('Creating new database file...');
  const db = new sqlite3.Database(dbFile);
  db.close();
  console.log('Database file created.');
}