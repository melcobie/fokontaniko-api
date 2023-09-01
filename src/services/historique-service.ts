import { AppDataSource } from "../data-source";
import Impot from "../entity/Impot";
import RequeteCitoyen from "../entity/RequeteCitoyen";

const getHistoriqueRequetes = async (foyerId: number, status: boolean= true, dateDebut: Date = new Date(0), dateFin: Date = new Date(),
    page: number = 1, pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;    
    let statusNombre = status? 1 : 0;
    let requetesQuery = AppDataSource.getRepository(RequeteCitoyen)
        .createQueryBuilder("demande")
        .leftJoinAndSelect("demande.citoyen", "citoyen")
        .leftJoin("citoyen.foyer", "foyer")
        .leftJoinAndSelect("demande.requete", "requete")
        .where("foyer.ID = :foyerId")
        .andWhere("demande.DATEREQUETE >= :dateDebut")
        .andWhere("demande.DATEREQUETE <= :dateFin")
        .andWhere("demande.STATUS = :status")
        .setParameters({ foyerId, dateDebut, dateFin, status: statusNombre })
        .orderBy('demande.DateRequete', 'DESC')
        // .skip(skip)
        // .take(take)
    if(skip) requetesQuery = requetesQuery.skip(skip)
    if(take) requetesQuery = requetesQuery.take(take);
    const requetes = await requetesQuery.getMany();
    return requetes;
}

const getHistoriquesImpot = async (foyerId: number, dateDebut: Date = new Date(0), dateFin: Date = new Date(),
page?: number, pageSize?: number) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    let impotsQuery = AppDataSource.getRepository(Impot)
        .createQueryBuilder("impot")
        .leftJoin("impot.foyer","foyer")
        .where("foyer.ID = :foyerId")
        .andWhere("impot.DATEPAIEMENT >= :dateDebut")
        .andWhere("impot.DATEPAIEMENT <= :dateFin")
        .setParameters({ foyerId, dateDebut, dateFin } )
        .orderBy('impot.annee', 'DESC')
        .addOrderBy('impot.mois', 'DESC')
        // .skip(skip)
        // .take(take)
    if(skip) impotsQuery = impotsQuery.skip(skip)
    if(take) impotsQuery = impotsQuery.take(take);
    const impots = await impotsQuery.getMany();
    return impots;
}

export default {
    getHistoriqueRequetes,
    getHistoriquesImpot,
}