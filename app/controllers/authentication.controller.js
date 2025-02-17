import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db/db.js";
import mysql from 'mysql2/promise';
dotenv.config();

import { __dirname } from "../server.js"

export const usuarios = [{
    name: "Juan",
    email: "juan@gmail.com",
    phone: "11",
    password: "$2a$05$EV/1.EE.Sa7p91mF4kudOeHEh4grjLRAsuzJPyMe8PQbinA5cWgyG",
    notifications: "on"
}]

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        const rutaAbsoluta = path.join(__dirname, "../profilePics");
        cb(null, rutaAbsoluta);
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log("File:", req.file);
        console.log("Body:", req.body);
        const fileTypes = /jpg|jpeg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLocaleLowerCase()
        );
        if(mimetype && path.extname){
            return cb(null,true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1},

});

const register = (req, res) => {
    console.log("Body recibido:", req.body);
    console.log("Archivo recibido:", req.file);

    const { name: Nombre, email: Email, phone: Telefono, password: Contrasena, passwordconf: ContrasenaConf , notifications: Notificaciones } = req.body;
    const FotoPerfil = req.file ? req.file.filename : null;

    if (!Nombre || !Email || !Telefono || !Contrasena || !FotoPerfil  || !ContrasenaConf || (Contrasena !== ContrasenaConf)) {
        return res.status(400).json({ status: "error", message: "Campos incompletos" });
    }

    db.query("SELECT * FROM user WHERE Email = ?", [Email], (error, results) => {
        if (error) return res.status(500).json({ status: "error", message: "Error en la base de datos" });

        if (results.length > 0) {
            return res.status(400).json({ status: "error", message: "El usuario ya está registrado" });
        }

        const hashedPassword = bcrypt.hashSync(Contrasena, 8);
        db.query(
            "INSERT INTO user (Nombre, Email, Telefono, Contrasena, FotoPerfil, Notificaciones) VALUES (?, ?, ?, ?, ?, ?)",
            [Nombre, Email, Telefono, hashedPassword, FotoPerfil, Notificaciones ? 1 : 0],
            (error, results) => {
                if (error) return res.status(500).json({ status: "error", message: "Error al registrar el usuario" });

                const token = jwt.sign(
                    { userId: results.insertId },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION }
                );

                console.log("usuario registrado correctamente")
                return res.status(201).send({status: "ok", message: `Usuario agregado`})
            }
        );
    });
};


const login = (req, res) => {
    const { email: Email, password: Contrasena } = req.body;

    if (!Email || !Contrasena) {
        return res.status(400).json({ status: "error", message: "Campos incompletos" });
    }

    db.query("SELECT * FROM user WHERE Email = ?", [Email], (error, results) => {
        if (error) return res.status(500).json({ status: "error", message: "Error en la base de datos" });

        if (results.length === 0) {
            return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(Contrasena, user.Contrasena);

        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null, message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ userId: user.IDUser }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000),
            path: "/"
        }
        res.cookie("jwt", token, cookieOption);
        res.send({status:"ok", message:"Usuario loggeado", redirect: "/inicio"});
    });
};

export { login, register, upload };