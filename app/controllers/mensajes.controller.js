import db from "../../db/db.js";

const allMessages = (req, res) => {
    const sql = "SELECT * FROM mensajes";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        res.json(rows);
    });
};

const showMessage = (req, res) =>{
    const {IDMensaje} = req.params;
    const sql = "SELECT * FROM mensajes WHERE IDMensaje = ?";
    db.query(sql,[IDMensaje], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(rows.length === 0){
            return res.status(404).send({error: "ERROR: No existe el mensaje buscado"})
        }
        res.json(rows[0]);
    });
};

const storeMessage = (req, res) => {
    const { Motivo, Mensaje, Usuario } = req.body;

    if (!Motivo || !Mensaje || !Usuario) {
        return res.status(400).json({ status: "error", message: "Campos incompletos" });
    }

    const sql = "INSERT INTO mensajes (Motivo, Mensaje, Usuario) VALUES (?,?,?)";
    db.query(sql,[Motivo, Mensaje, Usuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        const mensajeData = {...req.body, id: result.insertId};
        res.status(201).json(mensajeData);
    });
};

const updateMessage = (req, res) =>{
    const {IDMensaje} = req.params;
    const {Motivo, Mensaje, Usuario} = req.body;
    const sql = "UPDATE mensajes SET Motivo = ?, Mensaje = ?, Usuario = ? WHERE IDMensaje = ?";
    db.query(sql,[Motivo, Mensaje, Usuario, IDMensaje], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el mensaje a modificar no existe"})
        }

        const mensaje = {...req.body, id: result.params};
        res.json(mensaje)
    });
};

const destroyMessage = (req, res) =>{
    const {IDMensaje} = req.params;
    const sql = "DELETE FROM mensajes WHERE IDMensaje = ?";
    db.query(sql,[IDMensaje], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el mensaje a eliminar no existe"})
        }
        res.json({mensaje: "Usuario eliminado"})
    });
};

const getMessagesWithUserData = (req, res) => {
    const sql = `
        SELECT 
            mensajes.IDMensaje, 
            mensajes.Mensaje, 
            mensajes.Motivo, 
            user.Email
        FROM 
            mensajes 
        INNER JOIN 
            user 
        ON 
            mensajes.usuario = user.IDUser
    `;
    db.query(sql, (error, rows) => {
        if (error) {
            console.error("Error al obtener la galería:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
        res.json(rows);
    });
};

export {
    allMessages,
    showMessage,
    storeMessage,
    updateMessage,
    destroyMessage,
    getMessagesWithUserData,
}
