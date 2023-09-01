import foyerService from "../services/foyer-service"

async function getMyFoyer(req, res){
    try{
        const foyer = await foyerService.getInfoFoyer(req.user);
        if(foyer){
            res.json(foyer);
        }else{
            res.status(404).json(foyer);
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
}

async function getAllFoyer(req, res){
    try{
        const {page = 1, pageSize = 10} = req.query
        const allFoyers = await foyerService.getAllFoyer(page, pageSize);
        if(allFoyers){
            res.json(allFoyers);
        }else{
            res.sendStatus(500)
        }
    } catch(err){
        res.status(500).json({message: err.message})
    }  
}

export default{
    getMyFoyer,
    getAllFoyer
}