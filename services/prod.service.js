const  ProductosModel =require("./DB/models/prod")
const BaseDao = require("./DAO/base.js");

module.exports = class ProductoService extends BaseDao{

    ID = "_id";

    static getInstance() {
        return new ProductoService();
    }

    constructor() {
        if(typeof ProductoService.instance === 'object') {
            return ProductoService.instance;
        }
        super();
        ProductoService.instance = this;
        return this;
    }

    async getAll() {
        try {
            return await ProductosModel.find();
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async getProductById(objectId) {
        try {
            const product = await ProductosModel.find({[this.ID] : objectId})
            return product;
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async create(object) {
        try {
            return await ProductosModel.create(object)
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
    async deleteById(id) {
        try {
            return await ProductosModel.deleteOne({[this.ID]: id})
        } catch (error) {
            this.logger.error(error);
            return false;
        }
    }
    
}
