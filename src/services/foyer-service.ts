import { Repository } from "typeorm";
import Foyer from "../entity/Foyer";
import Users from "../entity/Users";
import { AppDataSource } from "../data-source";
import Citoyen from "../entity/Citoyen";

async function getInfoFoyer(user: Users){
    const foyerRepository = AppDataSource.getRepository(Foyer);
    if(!user.foyer) return null;
    let foyer = await foyerRepository.findOne({
        where: { id: user.foyer.id },
        relations: {
            chefFoyer: true,
            membres: true,
        }
    })
    foyer.membres = foyer.membres
        .filter(membre => membre.id !== foyer.chefFoyer.id)
        .sort((a, b) => compareCitoyen(a,b))
    return foyer;
}

function compareCitoyen(a: Citoyen, b: Citoyen){
    if(a.actif == true && b.actif == false){
        return -1;
    }else if(a.actif == false && b.actif == true){
        return 1;
    }else if(a.actif == b.actif){
        return a.dateNaissance < b.dateNaissance? -1
        : a.dateNaissance > b.dateNaissance? 1
        : 0;
    }
    return 0;
}

async function getAllFoyer(page: number = 1, pageSize: number = 10){
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const foyerRepository = AppDataSource.getRepository(Foyer);
    const foyers = await foyerRepository.find({
        skip,
        take,
        relations: { chefFoyer: true }
    })
    return foyers;
}

async function checkIfAdresseExists(adresse: string = ""){
    const foyer = await AppDataSource.getRepository(Foyer)
        .createQueryBuilder("FOYER")
        .where('LOWER(FOYER.ADRESSE)=:adresse', {adresse: adresse.toLowerCase()})
        .getOne()
    return foyer;
}

async function getAdresseLike(adresse: string = ""){
    let newstring = adresse.toLowerCase();
    const adresses = await AppDataSource.getRepository(Foyer)
        .createQueryBuilder("FOYER")
        .where('LOWER(FOYER.ADRESSE) like :adresse', {adresse: `%${newstring}%`})
        // .select(['adresse'])
        .take(10)
        .getMany();
    return adresses;
}

// async function getAllMembres() 

export default {
    getInfoFoyer,
    getAllFoyer,
    checkIfAdresseExists,
    getAdresseLike,
}