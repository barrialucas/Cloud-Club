const ProductoService =require("../services/prod.service.js") ;

const productoService = ProductoService.getInstance();

async function getAll(req, res) {
    const products = await productoService.getAll();
    products
        ? res.render('sneakers', {prods:products})
        : res.status(400).json({"error": "there was a problem when trying to get the products"})
}

async function getById(req, res) {
    const {id} = req.params;
    const product = await productoService.getProductById(id);

    product
        ? res.render('shoes', {shoes:product} )
        : res.status(400).json({"error": "product not found"})
}


module.exports={getAll,getById}