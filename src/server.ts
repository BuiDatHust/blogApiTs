import AuthController from "./authenticate/authenticate.controller";
import App from "./app";
import UserController from "./user/user.controller";
import PostController from "./post/post.controller";

const app = new App(
    [
        new AuthController(),
        new UserController(),
        new PostController()
    ]
)


app.listen();