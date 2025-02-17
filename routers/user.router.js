
import express from "express";
const router = express.Router();

import { getUsers, getUser, updateUser, destroyUser } from "../app/controllers/user.controller.js";
import { login, register, upload } from "../app/controllers/authentication.controller.js";
import userMiddleware from "../middlewares/user.middleware.js";

router.get("/", getUsers);
router.get("/protected", userMiddleware, (req, res) => {
    res.status(200).json(req.userId);
});
router.get("/:IDUser", getUser);
router.post("/register", upload.single("profilepic"), register);
router.post("/login", login);
router.put("/:IDUser", upload.single("profilepic"), updateUser);
router.delete("/:IDUser", destroyUser);

export default router;