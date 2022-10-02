const ProductoService =require("../services/prod.service.js") ;

const productoService = ProductoService.getInstance();

async function getAll(req, res) {
    const products = await productoService.getAll();
    products
        ? res.render('admin', {prods:products})
        : res.status(400).json({"error": "there was a problem when trying to get the products"})
}

async function create(req, res) {
    const {body} = req;
    const newProduct = await productoService.create(body);

    newProduct
        ? res.redirect('/admin')
        : res.status(400).json({"error": "there was an error, please verify the body content match the schema"})
}


async function remove(req, res) {
    const {id} = req.params;
    const wasDeleted = await productoService.deleteById({ _id: id })

    wasDeleted
        ? res.status(200).json({"success": "product successfully removed"})
        : res.status(404).json({"error": "product not found"})
}

module.exports={getAll,remove,create}