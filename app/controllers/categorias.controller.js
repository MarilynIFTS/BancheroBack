import db from "../../db/db.js";

const allCategories = (req, res) => {
    const sql = "SELECT * FROM categoria";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        res.json(rows);
    });
};

const showCatagory = (req, res) =>{
    const {IDCategoria} = req.params;
    const sql = "SELECT * FROM categoria WHERE IDCategoria = ?";
    db.query(sql,[IDCategoria], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(rows.length === 0){
            return res.status(404).send({error: "ERROR: No existe la categoría buscada"})
        }
        res.json(rows[0]);
    });
};

const storeCatagory = (req, res) => {
    const { category: NombreCategoria } = req.body;
    let ImagenIlustrativa = "";
    console.log(NombreCategoria, req.file)
    if (req.file) {
        ImagenIlustrativa = req.file.filename;
    }

    if(!NombreCategoria || !ImagenIlustrativa){
        return res.status(400).json({error: "No se proporcionaron todos los datos"});
    }
    const sql = "INSERT INTO categoria (NombreCategoria ,ImagenIlustrativa) VALUES (?, ?)";
    db.query(sql,[NombreCategoria, ImagenIlustrativa], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        const categoria = {...req.body, id: result.insertId};
        res.status(201).json(categoria);
    });
};

const updateCatagory = (req, res) =>{
    const {IDCategoria} = req.params;
    const {NombreCategoria} = req.body;
    const sql = "UPDATE categoria SET NombreCategoria = ? WHERE IDCategoria = ?";
    db.query(sql,[NombreCategoria, IDCategoria], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        };
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: la categoría a modificar no existe"})
        }

        const categoria = {...req.body, id: result.params};
        res.json(categoria)
    });
};

const destroyCatagory = (req, res) =>{
    const {IDCategoria} = req.params;
    const sql = "DELETE FROM categoria WHERE IDCategoria = ?";
    db.query(sql,[IDCategoria], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error: "ERROR: Intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error: "ERROR: la categoría a eliminar no existe"})
        }
        res.json({mensaje: "Categoría eliminada"})
    });
};

export {
    allCategories,
    showCatagory,
    storeCatagory,
    updateCatagory,
    destroyCatagory,
};