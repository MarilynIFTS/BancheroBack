import express from "express";
const router = express.Router();

import { allReserves, showReserve, storeReserve, updateReserve, destroyReserve, getReserveWithUserData } from "../app/controllers/reservas.controller.js";

router.get("/Datos", getReserveWithUserData);
router.get("/", allReserves);
router.get("/:IDReserva", showReserve);
router.post("/", storeReserve);
router.put("/:IDReserva", updateReserve);
router.delete("/:IDReserva", destroyReserve);

export default router;