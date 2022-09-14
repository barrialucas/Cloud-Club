const ProdsModel=require('../models/prod')


const getShoesProd = async (req, res,next)=>{
	if( req.isAuthenticated() ){
		const { id } = req.params;
		
	ProdsModel
		.find({_id:id})
		.then((shoes) => res.render('shoes', {shoes} ))
		.catch((err) => res.send(err))
	}
	else res.redirect("/login")
}


module.exports={getShoesProd}