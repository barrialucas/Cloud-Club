const ProdsModel=require('../models/prod')

function getProd(req, res) {
    res.render("admin")
}
function postProd(req, res) {
    const saveProd= new ProdsModel({
        title:req.body.title,
        price:req.body.price,
        img:req.body.img,
        desc:req.body.desc,
        stock:req.body.stock,
        date:new Date()
    })
    saveProd.save((err,db)=>{
        if(err) console.log(err)
        console.log(db);
    })
    res.render("admin")
}

module.exports={getProd,postProd}