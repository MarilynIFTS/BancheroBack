import db from "../../db/db.js";

const allReserves = (req, res) => {
    const sql = "SELECT * FROM reservas";
    db.query(sql, (error, rows)=> {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        };
        res.json(rows);
    });
};

const showReserve = (req, res) => {
    const {IDReserva} = req.params;
    const sql = "SELECT * FROM reservas WHEN IDReserva = ?";
    db.query(sql,[IDReserva], (error, rows)=> {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(rows.length === 0){
            return res.status(404).send({error: "ERROR: No existe el plato buscado"})
        }
        res.json(rows[0]);
    });
};

const storeReserve = (req, res) => {
    const {Sucursal, Fecha, Hora, CantidadDePersonas, Telefono, Usuario} = req.body;
    console.log(req.body)

    if (!Sucursal || !Fecha || !Hora || !CantidadDePersonas || !Telefono || !Usuario) {
        return res.status(400).json({ status: "error", message: "Campos incompletos" });
    }

    const sql = "INSERT INTO reservas (Sucursal, Fecha, Hora, CantidadDePersonas, Telefono, Usuario) VALUES (?,?,?,?,?,?)";
    db.query(sql, [Sucursal, Fecha, Hora, CantidadDePersonas, Telefono, Usuario], (error, result) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        const reserva = {...req.body, id: result.insertId};
        res.status(201).json(reserva);
    });
};

const updateReserve =  (req, res) => {
    const {IDReserva} = req.params;
    const {Sucursal, Fecha, Hora, CantidadDePersonas, Telefono} = req.body;
    if (!Sucursal || !Fecha || !Hora || !CantidadDePersonas || !Telefono) {
        return res.status(400).json({ status: "error", message: "Campos incompletos" });
    }

    const sql = "UPDATE reservas SET Sucursal = ?, Fecha = ?, Hora = ?, CantidadDePersonas = ?, Telefono = ? WHERE IDReserva = ?";
    db.query(sql, [Sucursal, Fecha, Hora, CantidadDePersonas, Telefono, IDReserva], (error, result) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el usuario a modificar no existe"})
        }
        const reserva = { IDReserva, Sucursal, Fecha, Hora, CantidadDePersonas, Telefono };
        res.status(201).json(reserva);
    });

};

const destroyReserve = (req, res) => {
    const {IDReserva} = req.params;
    const sql = "DELETE FROM reservas WHERE IDReserva = ?";
    db.query(sql, [IDReserva], (error, result) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el usuario a eliminar no existe"})
        }
        res.json({mensaje: "Plato eliminado"});
    });
};

const getReserveWithUserData = (req, res) => {
    const sql = `
        SELECT 
            reservas.IDReserva,
            reservas.Sucursal, 
            reservas.Fecha, 
            reservas.Hora,
            reservas.CantidadDePersonas,  
            reservas.Telefono,  
            user.Nombre,
            user.IDUser
        FROM 
            reservas 
        INNER JOIN 
            user 
        ON 
            reservas.Usuario = user.IDUser
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
    allReserves,
    showReserve,
    storeReserve,
    updateReserve,
    destroyReserve,
    getReserveWithUserData,
}