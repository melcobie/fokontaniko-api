import evenementService from "../services/evenement-service"

async function onGoingEvent(req, res){
    const {page = 1, pageSize = 3} = req.query
    const events = await evenementService.getOnGoingEvent(page, pageSize)
    res.json(events);
}

async function fairePresence(req, res) {
    const { foyerId, eventId } = req.body;
    if(!foyerId){
        return res.status(400).json({message: "Précisez le foyer"})
    }
    if(!eventId){
        return res.status(400).json({message: "Précisez l'événement"})
    }
    try{
        const presence = await evenementService.fairePresence(foyerId, eventId );
        res.send(presence)
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
}

export default{
    onGoingEvent,
    fairePresence,
}