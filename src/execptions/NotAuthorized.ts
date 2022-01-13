import HttpException from "./httpExceptions";

class NotAuthorization extends HttpException{
    constructor(){
        super(404, "You are not authorized");
    }
}

export default NotAuthorization