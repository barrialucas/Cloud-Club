const ProdsModel=require('../models/prod')

const getProd = async (req, res)=>{
	ProdsModel
		.find({})
		.then((prods) => res.render('admin', { prods }))
		.catch((err) => res.send(err));
}


const postProd = async (req, res)=> {
    const saveProd= new ProdsModel({
        title:req.body.title,
        price:req.body.price,
        img:req.body.img,
        img2:req.body.img2,
        img3:req.body.img3,
        img4:req.body.img4,
        desc:req.body.desc,
        stock:req.body.stock,
        date:new Date()
    })
    saveProd
        .save()
        .then(() => res.redirect('/admin'))
        .catch((err) => res.send(err));

}

const deleteProd = async (req,res)=>{
    const { id } = req.params;

	ProdsModel
		.deleteOne({ _id: id })
		.then(() => res.redirect('/admin'))
		.catch((err) => res.send(err));

}


module.exports={getProd,postProd,deleteProd}