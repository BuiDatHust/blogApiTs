import HttpException from "./httpExceptions";

class NotFoundUser extends HttpException{
    constructor(id: string){
        super(404, `the user with ${id} found this user`);
    }
}

export default NotFoundUser