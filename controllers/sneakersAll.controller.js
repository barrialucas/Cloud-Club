const ProductoService =require("../services/prod.service.js") ;
const logger=require('../utils/loggers/logger')

const productoService = ProductoService.getInstance();

async function getAll(req, res) {
    const products = await productoService.getAll();
    products
        ? res.render('sneakers', {prods:products})
        : logger.error()
}

async function getById(req, res) {
    const {id} = req.params;
    const product = await productoService.getProductById(id);

    product
        ? res.render('shoes', {shoes:product} )
        : logger.error("product not found")
}


module.exports={getAll,getById}