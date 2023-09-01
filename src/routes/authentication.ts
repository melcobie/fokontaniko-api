import { sign, destroy} from 'jsonwebtoken';
export let secret = "*[gbHf{4}{wuZ+:6@jh4#THnS]kU89";

import { AppDataSource } from '../data-source';
import Users from '../entity/Users';
import userService from '../services/user-service';
import citoyenService from "../services/citoyen-service";
import connect from '../utils/connect';
import foyerService from '../services/foyer-service';
import { hashPassword } from '../utils/crypto';
import Citoyen from '../entity/Citoyen';
import Foyer from '../entity/Foyer';

async function authenticate(req,res){
    let user = req.body;
    if(!user.email || !user.password){
        return res.status(400).json({message: "Précisez l'email et le mot de passe"});
    }
    
    const userRepository = AppDataSource.getRepository(Users);
    try{
        const registered = await userService.login(user, userRepository);
        console.log(registered);
        if(registered){
            let token = sign({sub: registered.id, email: registered.email}, secret,{
                expiresIn: '120h'
            });
            res.json({
                userInfo:registered, 
                token: token
            });
        }
        else{
            res.status(500).json({
                message: "Mot de passe ou email incorrect."
            })
        }
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

async function signup(req, res){
    let user = req.body?.user;
    let adresse = req.body?.adresse;
    let foyer = req.body?.foyer;
    let connection 
    try{
        connection = await connect.connect();
        if(!adresse){      
            let foyerId = await citoyenService.insertFoyer(foyer, connection);

            if(!foyer?.chefFoyer){
                connection.rollback();
                return res.status(400).json({message: "Précisez le chef de foyer"});
            }
            await citoyenService.insertChefFoyer(foyer?.chefFoyer, foyerId, connection);
            await citoyenService.insertCitoyens(foyer?.membres, foyerId, connection);
            await userService.insertNormalUser(user, foyerId, connection);
        }
        else{
            let foyer = await foyerService .checkIfAdresseExists(adresse);
            if(!foyer){
                return res .status(404) .json({message: "Cet adresse n'existe pas"})
            }
            await userService.insertNormalUser(user, foyer?.id, connection);
        }

        console.log("Inscription complète");

        connection.commit();

        res.json({
            email: user.email
        });
    }catch(err){
        if(connection){
            connection.rollback();
        }
        res.status(500).json({
            message: err.message
        })
    }finally {
        if (connection)
        {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
    } 
    // try{
    //     // const citoyenRepository = AppDataSource.getRepository(Citoyen);
    //     const foyerRepository = AppDataSource.getRepository(Foyer);

    //     if(!adresse){
    //         if(!foyer?.chefFoyer){
    //             return res.status(400).json({message: "Précisez le chef de foyer"});
    //         }
    //         let newFoyer = await citoyenService.newFoyer(foyer, foyerRepository);
    //         let newUser = await userService.insertUser(user, newFoyer.id);
    //         return res.json(newUser)
    //     }else{
    //         let newfoyer = await foyerService .checkIfAdresseExists(adresse);
    //         if(!newfoyer){
    //             return res .status(404) .json({message: "Cet adresse n'existe pas"})
    //         }
    //         let newUser = await userService.insertUser(user, newfoyer.id);
    //         return res.json(newUser)
    //     }
    // }catch(err){
    //     res.status(500).json({
    //         message: err.message
    //     })
    // }
}

async function logout(req, res) {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(" ")[1];
    if(!token) return res.json({message: "Déjà déconnecté"});
    await destroy(token)
}

async function checkIfEmailExists(req, res) {
    const response = await userService.checkIfEmailExists(req.query.email);
    res.json(response);
}

async function checkIfAdresseExists(req, res) {
    const response = await foyerService.checkIfAdresseExists(req.query.adresse);
    res.json(response);
}

async function getExistingAdresse(req, res) {
    const response = await foyerService.getAdresseLike(req.query.adresse);
    res.json(response);
}

export default {
    authenticate,
    signup,
    logout,
    checkIfEmailExists,
    checkIfAdresseExists,
    getExistingAdresse,
}