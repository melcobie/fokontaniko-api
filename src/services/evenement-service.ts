import { MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../data-source"
import Evenement from "../entity/Evenement"
import PresenceEvenement from "../entity/PresenceEvenement";


const getOnGoingEvent = async (page: number = 1, pageSize: number = 3) => {
    const eventRepository = AppDataSource.getRepository(Evenement);
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const today = new Date();
    const events = await eventRepository.find({
        where: {
            dateEvent: MoreThanOrEqual(today),
          },
        order: { dateEvent: 'ASC' },
        skip,
        take,
    });
    return events;
}

const fairePresence = async (foyerId: number, eventId: number) => {
    const presenceRepository = AppDataSource.getRepository(PresenceEvenement);
    try{
        let presence =  presenceRepository.create({
            foyer: { id: foyerId },
            evenement: { id: eventId }
        });
        presence.datePresence = new Date();
        presence.foyerId = foyerId;
        presence.evenementId = eventId;
        return await presenceRepository.save(presence);
    }catch(err){
        throw err;
    }
    
}


export default {
    getOnGoingEvent,
    fairePresence
}