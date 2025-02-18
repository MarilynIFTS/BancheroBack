import express from "express";
const router = express.Router();

import multer from "multer";
import path from "path";
import { __dirname } from "../app/index.js"

import { allDishes, showDish, storeDish, updateDish, destroyDish } from "../app/controllers/platos.controller.js";

router.get("/", allDishes);
router.get("/:IDPlato", showDish);
router.post("/", storeDish);
router.put("/:IDPlato", updateDish);
router.delete("/:IDPlato", destroyDish);

export default router;