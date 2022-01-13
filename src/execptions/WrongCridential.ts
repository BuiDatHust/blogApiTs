import HttpException from "./httpExceptions";

class WrongCredential extends HttpException{
    constructor(){
        super(404, "wrong credential");
    }
}

export default WrongCredential