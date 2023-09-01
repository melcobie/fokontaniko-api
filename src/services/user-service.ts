import { Repository } from 'typeorm';
import Users from '../entity/Users';
import { AppDataSource } from '../data-source';
import { comparePasswords, hashPassword } from '../utils/crypto';

const role = {
    ADMIN : 'ADMIN',
    NORMAL : 'NORMAL',
    FONCTIONNAIRE: 'FONCTIONNAIRE',
}

async function insertNormalUser(user, Foyerid, connection){
    try{
        let sql = `INSERT INTO Users(id, email, password, role, FoyerId)
        VALUES(SEQUSERS.nextval,:1,:2,:3,:4)`;
        let password = await hashPassword(user.password?user.password:"");
        let row = [
            user.email, password, role.NORMAL, Foyerid
        ];
        let result = await connection.execute(sql, row);
        console.log("User inséré");
        
    }catch(error){
        throw error;
    }
}

async function insertUser(user, foyerId){
    try{
        const userRepository = AppDataSource.getRepository(Users);
        let newUser = userRepository.create({ foyer: { id: foyerId }})
        newUser = {
            ...user,
            ...newUser,
        }
        newUser.role = role.NORMAL;
        return await userRepository.save(newUser);
    }catch(error){
        throw error;
    }
}

async function login(userInfo, userRepository: Repository<Users>){
    try{
        const user = await userRepository.findOne({
            where: { email: userInfo.email },
        });
        if(!user) return null;
        let matched = await comparePasswords(userInfo.password, user.password);
        return matched? user: null;
    }catch(error){
        throw error;
    }  
}

async function getUserByEmail(userInfo, userRepository: Repository<Users>){
    try{
        const user = await userRepository.findOne({
            where: { email: userInfo.email },
            relations: ['foyer'],
        });
        return user;
    }catch(error){
        throw error;
    }  
}

async function checkIfEmailExists(email: string){
    const user = await AppDataSource.manager.findOneBy(Users, {email: email});
    return user? true : false;
}

export default {
    role,
    insertNormalUser,
    login,
    checkIfEmailExists,
    getUserByEmail,
    insertUser,
}