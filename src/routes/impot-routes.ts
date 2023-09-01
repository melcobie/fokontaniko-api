import impotService from "../services/impot-service";

async function payerImpot(req, res) {
    const { foyerId, annee, mois } = req.body;
    if(!foyerId || !annee || !mois)
        return res.status(400).json({message: "Informations manquantes"})
    try{
        const impot = await impotService.payerImpot(foyerId, annee, mois);
        res.json(impot);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export default {
    payerImpot,
}