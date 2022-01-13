import { NextFunction, Response } from "express";
import RequestWithUser from "../interfaces/RequestWithUser.interface";
import * as jwt from 'jsonwebtoken'
import DataStoreInToken from "../interfaces/DataStoreInToken";
import userModel from "../user/user.model";
import AuthenticateMissingToken from "../execptions/AuthenticateMissingToken";
import WrongTokenUser from "../execptions/WrongTokenUser";



async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction){
    const cookie = req.cookies ;

    if( cookie && cookie.Authorization ){
        try {
            console.log(cookie.Authorization)
            const userId = jwt.verify(cookie.Authorization, "JWTSecret") as DataStoreInToken;
            const user  = await userModel.findById(userId._id);

            if(user){
                req.user = user ;
                
                next();
            }else{
                next(new WrongTokenUser());
            }
        } catch (error) {
            next(new  AuthenticateMissingToken());
        }
    }else{
        next(new AuthenticateMissingToken());
    }
}

export default authMiddleware