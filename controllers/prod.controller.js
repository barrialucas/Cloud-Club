const ProductoService =require("../services/prod.service.js")
const logger=require('../utils/loggers/logger')

const productoService = ProductoService.getInstance();

async function getAll(req, res) {
    if (req.isAdmin){
        const products = await productoService.getAll();
        products
            ? res.render('admin', {prods:products})
            : logger.warn('error getAll admin')
    }
}

async function create(req, res) {
    if (req.isAdmin){
        const {body} = req;
        const newProduct = await productoService.create(body);
        
        newProduct
            ? res.redirect('/admin')
            : logger.warn('error create admin')
    }
    
}


async function remove(req, res) {
    if (req.isAdmin){
        const {id} = req.params;
        const wasDeleted = await productoService.deleteById({ _id: id })
        
        wasDeleted
            ? res.status(200).json({"success": "product successfully removed"})
            : logger.warn('error remove admin')
    }
    
}

module.exports={getAll,remove,create}