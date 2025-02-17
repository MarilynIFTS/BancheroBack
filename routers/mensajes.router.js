import express from "express";
const router = express.Router();

import { allMessages, showMessage, storeMessage, updateMessage, destroyMessage, getMessagesWithUserData } from "../app/controllers/mensajes.controller.js";

router.get("/Datos", getMessagesWithUserData);
router.get("/", allMessages);
router.get("/:IDMensaje", showMessage);
router.post("/", storeMessage);
router.put("/:IDMensaje", updateMessage);
router.delete("/:IDMensaje", destroyMessage);

export default router;