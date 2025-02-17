import db from "../../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import dotenv from 'dotenv';
dotenv.config();

import { upload } from "./authentication.controller.js";

import query from "express";

const getUsers = (req, res) => {
    const sql = "SELECT Nombre, Email, FotoPerfil, Telefono FROM user";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        res.json(rows);
    });
}

const getUser = (req, res) =>{
    const {IDUser} = req.params;
    const sql = "SELECT * FROM user WHERE IDUser = ?";
    db.query(sql,[IDUser], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(rows.length === 0){
            return res.status(404).send({error: "ERROR: No existe el usuario buscado"})
        }
        res.json(rows[0]);
    });
};

const updateUser = (req, res) => {
    const {IDUser} = req.params;
    const {name: Nombre, email: Email, phone: Telefono, password: Contrasena, passwordconf: ContrasenaConf, notifications: Notificaciones} = req.body;

    let sql = "UPDATE user SET ";
    const updates = [];
    const values = [];

    if (Nombre) {
        updates.push("Nombre = ?");
        values.push(Nombre);
    }
    if (Email) {
        updates.push("Email = ?");
        values.push(Email);
    }
    if (Telefono) {
        updates.push("Telefono = ?");
        values.push(Telefono);
    }
    console.log(Contrasena, ContrasenaConf)
    if (Contrasena && ContrasenaConf) {
        if(Contrasena !== ContrasenaConf) {
            return res.status(400).json({ error: "Las contraseñas no coinciden" });
        }
        const hashedPassword = bcrypt.hashSync(Contrasena, 8);
        updates.push("Contrasena = ?");
        values.push(hashedPassword);

    }
    if (req.file) {
        updates.push("FotoPerfil = ?");
        values.push(req.file.filename);
        console.log("Nombre del archivo subido:", req.file.filename);
    }
    if (Notificaciones) {
        updates.push("Notificaciones = ?");
        values.push(Notificaciones ? 1 : 0);
    }

    sql += updates.join(", ") + " WHERE IDUser = ?";
    values.push(IDUser);
    console.log(sql);

    db.query(sql, values, (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el usuario a modificar no existe"})
        }

        const user = {...req.body, id: result.params};
        res.json(user);
    });
}

const destroyUser = (req, res) => {
    const {IDUser} = req.params;
    const sql = "DELETE FROM user WHERE IDUser = ?";

    db.query(sql,[IDUser], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el usuario a eliminar no existe"})
        }
        res.json({mensaje: "Usuario eliminado"})
    });
}

export { getUsers, getUser, updateUser, destroyUser };
