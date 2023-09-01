import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Citoyen from "../entity/Citoyen";
import Foyer from "../entity/Foyer";
import Users from "../entity/Users";
import connect from "../utils/connect";

async function insertFoyer(foyer, connection) {
    const sql = "INSERT INTO Foyer(Adresse, Longitude, Latitude, actif) VALUES(:adresse, :longitude, :latitude, 0) RETURNING id INTO :id";
    const bindRows = {
        adresse : foyer.adresse,
        longitude : foyer.longitude,
        latitude : foyer.latitude,
        id: connect.outputInsertConfig,
    }
    let result = await connection.execute(sql, bindRows);
    let id = result.outBinds.id[0];
    console.log("Foyer inséré")
    return id;
}

async function newFoyer(foyer, foyerRepository: Repository<Foyer>) {
    try{
        let newFoyer = foyerRepository.create();
        newFoyer = {
            ...newFoyer,
            ...foyer,
            actif: false
        };
        return await foyerRepository
            .save(newFoyer);
    }catch(err){
        throw err;
    }
}

async function insertChefFoyer(citoyen, foyerid, connection){
    let sql = `INSERT INTO Citoyen(Nom, Prenoms, dateNaissance, LieuNaissance, Sexe, nomPere, nomMere, CIN, DateCIN, LieuCIN, metier, dateInscription, FoyerId, actif)
    VALUES(:nom,:prenom,to_date(:dateNaissance, 'yyyy-mm-dd'),:lieuNaissance,:sexe,:nomPere,:nomMere,:CIN,to_date(:dateCIN, 'yyyy-mm-dd'),:lieuCIN,:metier,current_date,:foyerid,0)
    RETURNING id INTO :id`;
    let row = {
        nom: citoyen.nom, prenom: citoyen.prenoms, dateNaissance: citoyen.dateNaissance, lieuNaissance: citoyen.lieuNaissance, sexe: citoyen.sexe,
        nomPere: citoyen?.nomPere, nomMere: citoyen?.nomMere, CIN: citoyen?.CIN, dateCIN: citoyen?.dateCIN, lieuCIN: citoyen?.lieuCIN, 
        metier: citoyen?.metier, foyerid, id: connect.outputInsertConfig,
    }
    let result = await connection.execute(sql, row);

    let id = result.outBinds.id[0];
    sql = `UPDATE Foyer SET ChefFoyer=${id} WHERE id=${foyerid}`;
    result = await connection.execute(sql, []);
    console.log("Chef de foyer inséré")
}

async function insertCheffoyer(citoyen, foyer: Foyer, citoyenRepository: Repository<Citoyen>, foyerRepository: Repository<Foyer>){
    try{
        let chefFoyer = citoyenRepository.create({ foyer })
        chefFoyer = {
            ...citoyen,
            ...chefFoyer,
            dateInscription: new Date(),
            actif: false,
        }
        let result = await citoyenRepository.save(chefFoyer);
        foyer.chefFoyer = chefFoyer;
        await foyerRepository.save(foyer);
        return result;
    }catch(err){
        throw err;
    }
}

async function insertCitoyens(citoyens, foyerid, connection) {
    const sql = `INSERT INTO Citoyen(Nom, Prenoms, dateNaissance, LieuNaissance, Sexe, nomPere, nomMere, CIN, DateCIN, LieuCIN, metier, dateInscription, FoyerId, actif)
    VALUES(:1,:2,to_date(:3, 'yyyy-mm-dd'),:4,:5,:6,:7,:8,to_date(:9, 'yyyy-mm-dd'),:10,:11,current_date,:12,0)`;
    let rows = [];
    citoyens.forEach(citoyen => {
        rows.push([
            citoyen.nom, citoyen.prenoms, citoyen.dateNaissance, citoyen.lieuNaissance, citoyen.sexe,
            citoyen?.nomPere, citoyen?.nomMere, citoyen?.CIN, citoyen?.dateCIN, citoyen?.lieuCIN, 
            citoyen?.metier, foyerid
        ]);
    });
    let result = await connection.executeMany(sql, rows);
    
    console.log(result.rowsAffected, "Rows Inserted");
}

async function insertMembres(citoyens, foyer: Foyer, citoyenRepository: Repository<Citoyen>){
    try{
        citoyens.forEach(async citoyen => {
            let c = new Citoyen();
            c = {
                ...citoyen,
                foyer,
                dateInscription: new Date(),
                actif: false,
            };
            await citoyenRepository.save(c);
        })
    }catch(err){
        throw err;
    }
}

async function getCitoyenByID(ID: number){
    return await AppDataSource.getRepository(Citoyen).findOne({ 
        where: {id:ID} , 
        relations: {foyer: true}
    });
}

async function updateCitoyen(Id : number, toUpdate: any){
    const citoyenRepository = await AppDataSource.getRepository(Citoyen);
    let citoyen = await citoyenRepository .findOneBy({id: Id});
    if(!citoyen){
        return null;
    }

    citoyen = {
        ...citoyen,
        ...toUpdate,
    }

    try{
        return citoyenRepository.save(citoyen);
    }catch(err){
        throw err;
    }
}

async function insertCitoyen(citoyen: any, foyerId: number){
    const citoyenRepository = await AppDataSource.getRepository(Citoyen);
    try{
        let c = citoyenRepository.create({ foyer: {id: foyerId}})
        c = {
            ...c,
            ...citoyen,
        }
        return citoyenRepository.save(c);
    }catch(err){
        throw err;
    }
}

export default {
    insertFoyer,
    insertCitoyens,
    insertChefFoyer,
    getCitoyenByID,
    updateCitoyen,
    insertCitoyen,
    newFoyer,
    insertCheffoyer,
    insertMembres,
}