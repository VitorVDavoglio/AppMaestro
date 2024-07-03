import 'dotenv/config';
import mysql from "mysql";

const dburl = process.env.DBURL;
const dbuser = process.env.DBUSER;
const dbpassword = process.env.DBPASSWORD;
const dbdata = process.env.DBDATA;

const db = mysql.createPool({
    connectionLimit: 10,
    host: dburl,
    user: dbuser,
    password: dbpassword,
    database: dbdata
});

async function executeQuery(connection, query, parameters){
    return new Promise((resolve, reject) => {
        connection.query(query, parameters, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}


export { db, executeQuery };