import jwt from "jsonwebtoken";
import db from "../db/db.js"

export default(req, res, next) => {
    const adminHeader = req.headers["authorization"];
     
    if(!adminHeader)
        return res
            .status(403)
            .send({auth: false, message: "No se proveyo un token"});

    const token = adminHeader.split(" ")[1];

    if(!token)
        return res.status(403).send({auth: false, message: "Malformed Token"});

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error)
            return res
                .status(500)
                .send({auth: false, message:"Failed to authenticate token"});

        req.adminId = decoded.adminId;

        db.query("SELECT * FROM admin WHERE IDAdmin = ?", [req.adminId], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).send({ auth: false, message: "Usuario no encontrado" });
            }

            req.admin = results[0];
            next();
        });
    });
}