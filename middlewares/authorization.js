import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../db/db.js"

dotenv.config();


function soloAdmin(req, res, next){
    try {
        if (req.path === "/adminLogin") {
            return next();
        }

        const logueado = revisarCookieAdmin(req);

        if (!logueado) {
            return res.redirect("/adminLogin"); // Redirige solo si no es admin
        }

        return next(); 
    } catch (error) {
        console.error("Error en soloPublico:", error);
        return res.status(500).send("Error interno del servidor");
    }
}

function revisarCookieAdmin(req){
    try{  
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodficada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);

            const sql = "SELECT * FROM admin WHERE IDAdmin = ?";
            return new Promise((resolve, reject) => {
                db.query(sql, [decodficada.adminId], (err, results) => {
                    if (err) {
                        console.error("Error al consultar la base de datos:", err);
                        return reject(false);
                    }
    
                    if (results.length === 0) {
                        console.log("Usuario no encontrado en la base de datos");
                        return resolve(false);
                    }
    
                    console.log("Usuario encontrado:", results[0]);
                    resolve(true);
                });
            });    
    } catch (error) {
        console.error("Error al revisar la cookie:", error);
        req.admin = null;
        return false;
    }
}

function soloPublico(req, res, next){
        try {
            const logueado = revisarCookie(req);
            return next();
        } catch (error) {
            console.error("Error en soloPublico:", error);
            return res.status(500).send("Error interno del servidor");
        }
}

function revisarCookie(req){
    try{  
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodficada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);

            const sql = "SELECT * FROM user WHERE IDUser = ?";
            return new Promise((resolve, reject) => {
                db.query(sql, [decodficada.userId], (err, results) => {
                    if (err) {
                        console.error("Error al consultar la base de datos:", err);
                        return reject(false);
                    }
    
                    if (results.length === 0) {
                        console.log("Usuario no encontrado en la base de datos");
                        return resolve(false);
                    }
    
                    console.log("Usuario encontrado:", results[0]);
                    resolve(true);
                });
            });    
    } catch (error) {
        console.error("Error al revisar la cookie:", error);
        req.user = null;
        return false;
    }
}

export const methods = {
    soloAdmin,
    soloPublico
}