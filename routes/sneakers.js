const ProdsModel=require('../models/prod')

function getSneakers(req, res) {
    if(req.isAuthenticated()) {
        ProdsModel
            .find({})
            .then((prods) => res.render('sneakers', { prods}))
            .catch((err) => res.send(err));
    } else {
        res.render("login")
    }
}
module.exports={getSneakers}