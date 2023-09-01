import { verify } from 'jsonwebtoken';
import { secret } from '../routes/authentication';
import userService from '../services/user-service';
import { AppDataSource } from '../data-source';
import Users from '../entity/Users';
import citoyenService from '../services/citoyen-service';

export const isAuthentified = (req, res, next) => {
    const authToken = req.headers['authorization'];
    const token = authToken && authToken.split(" ")[1];
    if(token == null) return res.status(401).json({message: "Connectez-vous"});
    try{
        verify(token, secret, async (err, user)=>{      
            if(err) return res.status(440).json({message: "La session a expiré"});
            const userRepository = AppDataSource.getRepository(Users);
            req.user = await userService.getUserByEmail({email: user.email}, userRepository);
            console.log(req.user)
            next();
        })
    }catch(err){
        return res.status(500).json({message : err.message});
    }
}

export const isAuthorizedAdmin = (req, res, next) => {
    if(req.user?.role !== userService.role.ADMIN){
        return res.status(403).json({message: "Utilisateur non autorisé"});
    }else{
        next();
    }
}

export const isAuthorizedFonctionnaire = (req, res, next) => {
    if(req.user?.role !== userService.role.FONCTIONNAIRE){
        return res.status(403).json({message: "Utilisateur non autorisé"});
    }else{
        next();
    }
}

export const isOwner = async (req, res, next) => {
    let citoyenId = req?.body?.citoyenId || req?.params?.id ;
    if(!citoyenId)
        return res.status(500).json({message: "Précisez le citoyen"})
    const citoyen = await citoyenService.getCitoyenByID(citoyenId);
    const user: Users = req.user;
    if(citoyen?.foyer?.id === user?.foyer?.id){
        req.citoyen = citoyen;
        next();
    }else{
        return res.status(403).json({message: "Vous n'avez pas accès à ce citoyen"})
    }
}