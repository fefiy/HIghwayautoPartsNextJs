import mysql, { QueryOptions } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

type QueryFunction = {
  (sql: string, values?: any[]): Promise<any>;
  (options: QueryOptions, values?: any[]): Promise<any>;
};

export const query: QueryFunction = (sqlOrOptions: string | QueryOptions, values?: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (typeof sqlOrOptions === 'string') {
      db.query(sqlOrOptions, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    } else {
      db.query(sqlOrOptions, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    }
  });
};

// import mysql from 'mysql2';
// import dotenv from 'dotenv';
// import util from 'util';

// dotenv.config();

// export const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || '3306'),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// db.connect((err) => {
//     if (err) {
//       console.error("Failed to connect to the database:", err);
//       return;
//     }
//     console.log("Connected to the database");
//   });
  
// export const query = util.promisify(db.query).bind(db);
