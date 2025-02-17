import jwt from "jsonwebtoken";
import db from "../db/db.js"

export default(req, res, next) => {
    const userHeader = req.headers["authorization"];
     
    if(!userHeader)
        return res
            .status(403)
            .send({auth: false, message: "No se proveyo un token"});

    const token = userHeader.split(" ")[1];

    if(!token)
        return res.status(403).send({auth: false, message: "Malformed Token"});

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if(error)
            return res
                .status(500)
                .send({auth: false, message:"Failed to authenticate token"});

        req.userId = decoded.userId;

        db.query("SELECT * FROM user WHERE IDUser = ?", [req.userId], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).send({ auth: false, message: "Usuario no encontrado" });
            }

            req.user = results[0];
            next();
        });
    });
}