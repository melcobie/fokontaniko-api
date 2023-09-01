import historiqueService from "../services/historique-service";

async function getDemandes(req, res){
    const foyerId = req.user?.foyer?.id;
    let { dateDebut, dateFin, page, pageSize, status } = req.query;
    if(status === undefined) status = true
    else status = JSON.parse(status);
    console.log(status)
    try{
        const requetes = await historiqueService.getHistoriqueRequetes(foyerId, status, dateDebut? new Date(dateDebut): dateDebut, dateFin? new Date(dateFin): dateFin, page, pageSize);
        res.json(requetes);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

async function getImpots(req, res){
    const foyerId = req.user?.foyer?.id;
    const { dateDebut, dateFin, page, pageSize } = req.query;
    try{
        const requetes = await historiqueService.getHistoriquesImpot(foyerId, dateDebut? new Date(dateDebut): dateDebut, dateFin? new Date(dateFin): dateFin, page, pageSize);
        res.json(requetes);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export default {
    getDemandes,
    getImpots,
}