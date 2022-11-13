const UsersModel=require('../services/DB/models/users')

async function getHome(req, res) {
    res.render("home")//error
}

async function account(req, res){
    const user=req.user
    try {
        UsersModel
        .find({username: user.username})
        .then((users) => res.status(200).render("account",{users}))
        .catch((err) => res.send(err));
        
      } catch (error) {
        res.status(500).send(error)
      }
}

async function msg(req, res){
  res.render(`msg`)
}

module.exports={getHome,account,msg}