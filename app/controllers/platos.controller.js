import db from "../../db/db.js";

const allDishes = (req, res) => {
    const sql = "SELECT * FROM plato";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        res.json(rows);
    });
};

const showDish = (req, res) =>{
    const {IDPlato} = req.params;
    const sql = "SELECT * FROM plato WHERE IDPlato = ?";
    db.query(sql,[IDPlato], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(rows.length === 0){
            return res.status(404).send({error: "ERROR: No existe el plato buscado"})
        }
        res.json(rows[0]);
    });
};

const storeDish = (req, res) => {
    console.log(req.body);
    const {Descripcion, Precio, Categoria} = req.body
    const sql = "INSERT INTO plato (Descripcion, Precio, Categoria) VALUES (?,?,?)";
    db.query(sql,[Descripcion, Precio, Categoria], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        const plato = {...req.body, id: result.insertId};
        res.status(201).json(plato);
    });
};

const updateDish = (req, res) =>{
    const {IDPlato} = req.params;
    const {Descripcion, Precio, Categoria} = req.body;
    const sql = "UPDATE plato SET Descripcion = ?, Precio = ?, Categoria = ? WHERE IDPLato = ?";
    db.query(sql,[Descripcion, Precio, Categoria, IDPlato], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el plato a modificar no existe"})
        }

        const plato = {...req.body, id: result.params};
        res.json(plato)
    });
};

const destroyDish = (req, res) =>{
    const {IDPlato} = req.params;
    const sql = "DELETE FROM plato WHERE IDPlato = ?";
    db.query(sql,[IDPlato], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: el plato a eliminar no existe"})
        }
        res.json({mensaje: "Plato eliminado"})
    });
};

export {
    allDishes,
    showDish,
    storeDish,
    updateDish,
    destroyDish,
};