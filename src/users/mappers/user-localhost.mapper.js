import { User } from "../models/user"


/**
 * 
 * @param {User} user 
 * //@returns {userMapped}
 */



export const userModelToLocalhost=(user)=>{

    const {avatar,balance,firstName,gender,id,isActive,lastName}=user;


    const userMapped={
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName
    }

    return userMapped
        
        

}