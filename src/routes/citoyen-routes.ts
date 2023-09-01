import citoyenService from "../services/citoyen-service";

async function updateCitoyen(req, res){
    let citoyenId = req.params.id;
    try{
        const citoyen = await citoyenService.updateCitoyen(citoyenId, req.body);
        if(citoyen){
            res.json(citoyen);
        }else{
            res.status(404).json({message: "Citoyen non-trouvé"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

async function insertCitoyen(req, res){
    if(!req.body.foyerId)
        return res.status(400).json({message: "Précisez le foyer"})
    try{
        console.log(req.body)
        const citoyen = await citoyenService.insertCitoyen(req.body, req.body.foyerId)
        res.json(citoyen);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

export default {
    updateCitoyen,
    insertCitoyen,
}