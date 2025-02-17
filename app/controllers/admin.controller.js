import db from "../../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import dotenv from 'dotenv';
dotenv.config();

import { upload } from "./authentication.controller.js";

import query from "express";

const getAdmins = (req, res) => {
    const sql = "SELECT * FROM admin";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        res.json(rows);
    });
}

const getAdmin = (req, res) =>{
    const {IDAdmin} = req.params;
    const sql = "SELECT * FROM admin WHERE IDAdmin = ?";
    db.query(sql,[IDAdmin], (error, rows) => {
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

const updateAdmin = (req, res) => {
    const {IDAdmin} = req.params;
    const {name: Nombre, email: Email, phone: Telefono, password: Contrasena, notifications: Notificaciones} = req.body;

    let sql = "UPDATE admin SET ";
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
    if (Contrasena) {
        const hashedPassword = bcrypt.hashSync(Contrasena, 8);
        updates.push("Contraseña = ?");
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

    sql += updates.join(", ") + " WHERE IDAdmin = ?";
    values.push(IDAdmin);
    console.log(sql);

    db.query(sql, values, (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el usuario a modificar no existe"})
        }

        const admin = {...req.body, id: result.params};
        res.json(admin);
    });
}

const destroyAdmin = (req, res) => {
    const {IDAdmin} = req.params;
    const sql = "DELETE FROM admin WHERE IDAdmin = ?";

    db.query(sql,[IDAdmin], (error, result) => {
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

export { getAdmins, getAdmin, updateAdmin, destroyAdmin };
