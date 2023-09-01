let Actualite = require("../model/actualite");

async function getActualites(req, res){
    let {limit=10,page=1} = req.query;
    let query = {
        status: "Publié",
        dateCreation: { $lte: new Date()}
    };
    Actualite.paginate(query,{offset:(limit *(page-1)),limit:limit, sort: {dateCreation: -1} },(err,reponse)=>{
        if(err){
            res.status(400).send("");
        }
        res.send(reponse);
    });
}

module.exports = {
    getActualites,
}