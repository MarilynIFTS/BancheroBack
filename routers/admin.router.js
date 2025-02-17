import express from "express";
const router = express.Router();

import { getAdmins, getAdmin, updateAdmin, destroyAdmin } from "../app/controllers/admin.controller.js";
import { loginAdmin, registerAdmin, upload } from "../app/controllers/authenticationAdmin.controller.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

router.get("/", getAdmins);
router.get("/protected", adminMiddleware, (req, res) => {
    res.status(200).json(req.adminId);
});
router.get("/:IDAdmin", getAdmin);
router.post("/registerAdmin", upload.single("profilepic"), registerAdmin);
router.post("/loginAdmin", loginAdmin);
router.put("/:IDAdmin", upload.single("profilepic"), updateAdmin);
router.delete("/:IDAdmin", destroyAdmin);

export default router;