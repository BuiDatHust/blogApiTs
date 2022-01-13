import HttpException from "./httpExceptions";

class WrongTokenUser extends HttpException{
    constructor(){
        super(404, "Token User wrong");
    }
}

export default WrongTokenUser