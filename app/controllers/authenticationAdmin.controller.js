import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db/db.js";

dotenv.config();

import { __dirname } from "../index.js";

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

const registerAdmin = (req, res) => {
    console.log("Body recibido:", req.body);
    console.log("Archivo recibido:", req.file);

    const { name: Nombre, email: Email, phone: Telefono, password: Contrasena, notifications: Notificaciones } = req.body;
    const FotoPerfil = req.file ? req.file.filename : null;

    
    if (!Nombre || !Email || !Telefono || !Contrasena || !FotoPerfil) {
        return res.status(400).json({ status: "error", message: "Campos incompletos" });
    }

    console.log(Nombre, Email, Telefono, Contrasena, Notificaciones)

    db.query("SELECT * FROM admin WHERE Email = ?", [Email], (error, results) => {
        if (error) return res.status(500).json({ status: "error", message: "Error en la base de datos" });

        if (results.length > 0) {
            return res.status(400).json({ status: "error", message: "El usuario ya está registrado" });
        }

        const hashedPassword = bcrypt.hashSync(Contrasena, 8);
        db.query(
            "INSERT INTO admin (Nombre, Email, Telefono, Contrasena, FotoPerfil, Notificaciones) VALUES (?, ?, ?, ?, ?, ?)",
            [Nombre, Email, Telefono, hashedPassword, FotoPerfil, Notificaciones ? 1 : 0],
            (error, results) => {
                if (error) return res.status(500).json({ status: "error", message: "Error al registrar el usuario" });

                const token = jwt.sign(
                    { adminId: results.insertId },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION }
                );

                console.log("usuario registrado correctamente")
                return res.status(201).send({status: "ok", message: `Usuario agregado`})
            }
        );
    });
};


const loginAdmin = (req, res) => {
    const { email: Email, password: Contrasena } = req.body;

    if (!Email || !Contrasena) {
        return res.status(400).json({ status: "error", message: "Campos incompletos" });
    }

    db.query("SELECT * FROM admin WHERE Email = ?", [Email], (error, results) => {
        if (error) return res.status(500).json({ status: "error", message: "Error en la base de datos" });

        if (results.length === 0) {
            return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }

        const admin = results[0];
        const passwordIsValid = bcrypt.compareSync(Contrasena, admin.Contrasena);

        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null, message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ adminId: admin.IDAdmin }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION,
        });

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000),
            path: "/"
        }
        res.cookie("jwt", token, cookieOption);
        res.send({status:"ok", message:"Usuario loggeado", redirect: "/inicioAdmin"});
    });
};

export { loginAdmin, registerAdmin, upload };