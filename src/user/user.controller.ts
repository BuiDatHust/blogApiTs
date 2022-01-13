import NotFoundUser from "../execptions/UserNotFound";
import { NextFunction, Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import userModel from "./user.model";
import RequestWithUser from "../interfaces/RequestWithUser.interface";
import postModel from "../post/post.model";
import NotAuthorization from "../execptions/NotAuthorized";
import authMiddleware from "../middleware/auth.middleware";

class UserController implements Controller{
    public path = "/user";
    public router = Router();

    constructor(){
        this.initializeRoute();
    }

    private initializeRoute(){
        this.router
            .all(`${this.path}/*`,authMiddleware)
            .get(`${this.path}/:id`,this.getSingleUser)
            .get(`${this.path}/getPosts/:id`,this.getAllPostOfUser);
    }

    private getSingleUser = async (req:Request, res:Response, next:NextFunction) =>{
        const userId :string = req.params.id;
        
        try {
            const user = await userModel.findById({_id: userId});
            res.send(user);
        } catch (error) {
            next(new NotFoundUser(userId))
        }
    }

    private getAllPostOfUser =async (req:RequestWithUser, res:Response, next: NextFunction) =>{
        const userId = req.params.id;

        if( userId === req.user._id.toString() ){
            const posts = await postModel.find({ authorId: userId });
            res.send(posts);
        }
        next(new NotAuthorization());
    }

}

export default UserController