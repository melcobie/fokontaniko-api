import { error } from "console";
import { AppDataSource } from "../data-source"
import Citoyen from "../entity/Citoyen";
import Requete from "../entity/Requete"
import RequeteCitoyen from "../entity/RequeteCitoyen";

const getRequests = async () => {
    const requetes = await AppDataSource
        .getRepository(Requete)
        .find();
    return requetes;
}

const makeARequest = async (citoyen: Citoyen, requete: Requete, quantite: number) => {
    const demandeRequete = new RequeteCitoyen();
    demandeRequete.DateRequete = new Date();
    demandeRequete.citoyen = citoyen;
    demandeRequete.requete = requete;
    demandeRequete.status = false;
    demandeRequete.prix = requete.frais;
    demandeRequete.quantite = quantite;


    return await AppDataSource.getRepository(RequeteCitoyen)
        .save(demandeRequete);
}

const makeRequest = async (citoyen: Citoyen, requeteID: number, quantite: number = 1) => {
    const requete = await AppDataSource.getRepository(Requete).findOneBy({id:requeteID});
    if(!requete) throw new Error("La requete n'existe pas")
    return makeARequest(citoyen, requete, quantite);
}

const approveRequest = async (requeteID: number) => {
    const requeteRepository = AppDataSource.getRepository(RequeteCitoyen);
    const requete = await requeteRepository.findOneBy({id:requeteID});
    if(!requete) throw new Error("La demande n'existe pas")
    requete.status = true;
    return await requeteRepository.save(requete);
}

export default {
    getRequests,
    makeRequest,
    approveRequest,
}