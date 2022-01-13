import * as bodyParser from 'body-parser';
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as mongoose from 'mongoose'
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App{
    public app: express.Application ;

    constructor(controllers: Controller[]){
        this.app = express();

        this.connectToDatabase();
        this.initializeMiddleware();
        this.intializeErrorHandle();
        this.initiallizeController(controllers);
        this.intializeErrorHandle();
    }

    public listen(){
        this.app.listen({port: 3000}, () =>{
            console.log(`server is listening on port 3000 `)
        })
    }

    public getServe(){
        return this.app;
    }

    private initializeMiddleware(){
        this.app.use(bodyParser.json())
        this.app.use(cookieParser())
    }

    private initiallizeController(controllers: Controller[]){
        controllers.forEach((controller) =>{
            this.app.use('/', controller.router);
        })
    }

    private intializeErrorHandle(){
        this.app.use(errorMiddleware)
    }

    private async connectToDatabase(){
        try {
            mongoose.connect(`mongodb+srv://dat:1234@cluster0.f5hcz.mongodb.net/Blog?retryWrites=true&w=majority`);
            console.log("successfull connect")
        } catch (error) {
            console.log(error);
            
        }
        
    }
}

export default App ;
