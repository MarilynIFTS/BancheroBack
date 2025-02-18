import dotenv from 'dotenv';
dotenv.config();

import express from "express";
const app = express();
import cors from 'cors';
app.use(cors());

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { login, register } from "./controllers/authentication.controller.js";
import { loginAdmin, registerAdmin } from "./controllers/authenticationAdmin.controller.js";
import { getUsers, getUser, updateUser, destroyUser } from "./controllers/user.controller.js";

import { methods as authorization } from "../middlewares/authorization.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log("Servidor correndo en puerto ", PORT);

import userRouter from "../routers/user.router.js";
import imagenesRouter from "../routers/imagenes.router.js"
import mensajesRouter from "../routers/mensajes.router.js"
import reservasRouter from "../routers/reservas.router.js"
import adminRouter from "../routers/admin.router.js"
import categoriasRouter from "../routers/categorias.router.js"
import platosRouter from "../routers/platos.router.js"

app.use(express.static(__dirname + "/public"));
app.use("/profilePics", express.static(path.join(__dirname, "../profilePics")));
app.use("/imagenesGaleria", express.static(path.join(__dirname, "../imagenesGaleria")));
app.use("/imgCateg", express.static(path.join(__dirname, "../imgCateg")));
app.use(express.json());
app.use("/user", userRouter);
app.use("/imagenes", imagenesRouter);
app.use("/mensajes", mensajesRouter);
app.use("/reservas", reservasRouter);
app.use("/admin", adminRouter);
app.use("/categorias", categoriasRouter);
app.use("/platos", platosRouter);

/* Public */
app.get("/login", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/login.html"));
app.post("/api/login", login);
app.post("/api/register", register);
app.get("/register", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/inicio", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/inicio.html"));
app.get("/carrito", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/carrito.html"));
app.get("/contacto", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/contacto.html"));
app.get("/galeria", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/galeria.html"));
app.get("/historia", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/historia.html"));
app.get("/menu", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/menu.html"));
app.get("/reservar", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/reservar.html"));
app.get("/editarPerfil", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/editarPerfil.html"));
app.get("/slider", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/slider.html"));

/* Admin */
app.get("/adminLogin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/adminLogin.html"));
app.post("/api/loginAdmin", loginAdmin);
app.post("/api/registerAdmin", registerAdmin);
app.get("/adminRegister", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/adminRegister.html"));
app.get("/inicioAdmin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/inicioAdmin.html"));
app.get("/menuAdmin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/menuAdmin.html"));
app.get("/galeriaAdmin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/galeriaAdmin.html"));
app.get("/reservasAdmin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/reservasAdmin.html"));
app.get("/contactoAdmin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/contactoAdmin.html"));
app.get("/usuariosAdmin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/usuariosAdmin.html"));
export { __dirname }