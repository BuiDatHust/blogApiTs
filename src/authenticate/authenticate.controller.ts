import { NextFunction, Request, Response, Router } from "express";
import validationMiddleware from "../middleware/validate.middleware";
import Controller from "../interfaces/controller.interface";
import createUserDto from "../user/user.dto";
import userModel from "../user/user.model";
import AuthService from "./authenticate.service";
import LoginDto from "./loginDto.dto";
import WrongCredential from "../execptions/WrongCridential";
import * as bcrypt from 'bcrypt';

class AuthController implements Controller {
    public path= "/auth";
    public router = Router() ;
    private user = userModel ;
    public authService = new AuthService(); 

    constructor(){
        this.initializeRoute();
    }

    private initializeRoute(){
        this.router.post( `${this.path}/register`,validationMiddleware(createUserDto), this.register );
        this.router.post( `${this.path}/login`,validationMiddleware(LoginDto), this.login );
        this.router.post( `${this.path}/logout`, this.logout );
    }

    private register = async (req:Request, res:Response, next:NextFunction) =>{
        const userData: createUserDto = req.body ;
        console.log(userData);
        try {
            const {
                cookie,
                user
            }  = await this.authService.register(userData);
            res.setHeader('Set-Cookie', [cookie+"; path=/"]);
            res.send(user);

        } catch (error) {
            next(error);
        }
    }

    private login =async (req: Request ,res: Response, next: NextFunction) =>{
        const userLogin: LoginDto = req.body ;
        const user = await userModel.findOne({ email: userLogin.email });

        if( user ){
            const isMatchingPassword = await bcrypt.compare(
                userLogin.password,
                user.password
            )
            console.log(isMatchingPassword)
            if( isMatchingPassword ){
                const token = this.authService.createToken(user);
                res.setHeader('Set-Cookie', [this.authService.createCookie(token)+"; path=/"]);
                
                res.send(user);
            }else{
                next(new WrongCredential());
            }
        }else{
                next(new WrongCredential());
        }
    }

    private logout = async  (req: Request ,res: Response, next: NextFunction)  =>{
        res.setHeader('Set-Cookie', ['Authorization=;Max-Age=0'])
        res.sendStatus(200);
    }
}

export default AuthController