import requeteService from "../services/requete-service";

async function getRequests(req, res) {
    const requetes = await requeteService.getRequests();
    res.json(requetes);
}

async function makeARequest(req, res) {
    try{
        const response = await requeteService.makeRequest(req.citoyen, req.body.requeteId, req.body?.quantite);
        if(response){
            res.json(response);
        }else{
            res.status(404);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

async function approveRequest(req, res) {
    const demandeId = req.query.demandeId;
    if(!demandeId) return res.status(400).json({message: "Précisez la demande"})
    try{
        const response = await requeteService.approveRequest(demandeId);
        if(response){
            res.json(response);
        }else{
            res.status(404);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export default {
    getRequests,
    makeARequest,
    approveRequest,
}