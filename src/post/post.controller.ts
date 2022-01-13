import { NextFunction, Request, response, Response, Router } from "express";
import RequestWithUser from "../interfaces/RequestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validate.middleware";
import Controller from "../interfaces/controller.interface";
import createPostDto from "./post.dto";
import Post from "./post.interface";
import postModel from "./post.model";
import HttpException from "../execptions/httpExceptions";

class PostController implements Controller{
    public path = "/post";
    public router = Router();
    private post = postModel;

    constructor(){
        this.initializeRoute();
    }

    private initializeRoute(){
        this.router.get(`${this.path}/allPost`,this.getAllPost )
        this.router.get(`${this.path}/:id`,this.getSinglePost )
        this.router
            .all(`${this.path}/*`,authMiddleware)
            .post(`${this.path}/createPost`,validationMiddleware(createPostDto), this.createPost)
            .post(`${this.path}/updatePost/:id`,validationMiddleware(createPostDto,true), this.updatePost)
    }

    private getAllPost = async (req: Request,res:Response, next:NextFunction) =>{
        const posts = await postModel.find({}).populate('authorId','-password');
        console.log(posts);
        res.send(posts);
    }

    private updatePost = async (req: Request,res:Response, next:NextFunction) =>{
        const postId = req.params.id;
        const postData :Post = req.body;

        const newPost = await postModel.findByIdAndUpdate({_id: postId}, postData)

        res.send(newPost)
    }

    private getSinglePost =  async (req: Request,res:Response, next:NextFunction) =>{
        const postId = req.params.id ;
        
        try {
            const post = await postModel.findOne({_id: postId}).populate('authorId', '-password');
            res.send(post)
        } catch (error) {
            next(new HttpException(404,"Post not found"))
        }
    }

    private createPost = async (req: RequestWithUser,res:Response, next:NextFunction) =>{
        const newPost : Post = req.body ;
        const createPost = new this.post({
            ...newPost,
            authorId: req.user._id
        })
        const savedPost: Post = await createPost.save();

        res.send(savedPost);
    }
}

export default PostController