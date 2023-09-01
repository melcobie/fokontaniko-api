import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../data-source"
import Impot from "../entity/Impot"

const payerImpot = async(foyerId: number, annee: number, mois: number, datePaiement: Date = new Date()) => {
    const impotRepository = AppDataSource.getRepository(Impot)
    try{
        const impot = impotRepository.create({ foyer: {id: foyerId}});
        impot.annee = annee;
        impot.mois = mois;
        impot.datePaiement = datePaiement;
        return await impotRepository.save(impot);
    }catch(error){
        if (error instanceof QueryFailedError && error.message.includes('duplicate key value')){
            throw new Error("Ce foyer a déjà payer cet impot")
        }else{
            throw error;
        }
    }
}

export default {
    payerImpot,
}