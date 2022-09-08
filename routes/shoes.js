const ProdsModel=require('../models/prod')

const getShoesProd = async (req, res)=>{
	const { id } = req.params;

	ProdsModel
		.find({_id:id})
		.then((shoes) => res.render('shoes', {shoes} ))
		.catch((err) => res.send(err))
}

module.exports={getShoesProd}