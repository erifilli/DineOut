const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dineout',
  connectionLimit: 5,
});

// Function to run queries
async function query(sql, params) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(sql, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (conn) {
      conn.release(); // Release connection back to the pool
    }
  }
}

module.exports = {
  query,
}; 