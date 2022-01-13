import HttpException from "./httpExceptions";

class EmailAlreadyExist extends HttpException{
    constructor(email: string){
        super(404, `user with ${email} already exist `);
    }
}

export default EmailAlreadyExist