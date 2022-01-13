import HttpException from "./httpExceptions";

class AuthenticateMissingToken extends HttpException {
    constructor(){
        super(401, "Authentication token missing")
    }
}

export default AuthenticateMissingToken