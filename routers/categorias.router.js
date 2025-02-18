import express from "express";
const router = express.Router();

import multer from "multer";
import path from "path";
import { __dirname } from "../app/index.js"

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        const rutaAbsoluta = path.join(__dirname, "../imgCateg");
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
        console.log(file);
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

import { allCategories, showCatagory, storeCatagory, updateCatagory, destroyCatagory } from "../app/controllers/categorias.controller.js"

router.get("/", allCategories);
router.get("/:IDCategoria", showCatagory);
router.post("/", upload.single("img"), storeCatagory);
router.put("/:IDCategoria", updateCatagory);
router.delete("/:IDCategoria", destroyCatagory);

export default router;