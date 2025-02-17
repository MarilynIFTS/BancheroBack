import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((error)  => {
    if(error){
        return console.error(error)
    }else{
        console.log("Estamos conectados a la DB de Pizzeria");
    }
});

export default db;