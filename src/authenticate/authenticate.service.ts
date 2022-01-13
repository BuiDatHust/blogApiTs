import EmailAlreadyExist from "../execptions/EmailAlreadyExist";
import createUserDto from "../user/user.dto";
import userModel from "../user/user.model";
import * as bcrypt from 'bcrypt'
import TokenData from "../interfaces/tokenData";
import User from "../user/user.interface";
import DataStoreInToken from "../interfaces/DataStoreInToken";
import * as jwt from 'jsonwebtoken' ;


class AuthService {
    public user = userModel ;

    public async register(userData: createUserDto){
        if( 
            await this.user.findOne({email: userData.email})
         ){
             throw new EmailAlreadyExist(userData.email);
         }

         const hashedPassword = await bcrypt.hash(userData.password, 10);
         const user = await this.user.create({
             ...userData,
             password: hashedPassword
         });

         const tokenData = this.createToken(user);
         const cookie = this.createCookie(tokenData);

         return {
             cookie,
             user
         }


    } ;

    public createCookie(tokenData: TokenData){
        // const maxAge= 259200;
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }

    public createToken(user:User): TokenData {
        const expiresIn = 60*60 ;
        const secret= "JWTSecret";
        const dataStoreInToken :DataStoreInToken = {
            _id: user._id
        };

        return {
            expiresIn,
            token: jwt.sign(dataStoreInToken, secret, {expiresIn})
        }
    }
}

export default AuthService