import { LoginControllers } from "../controllers/login";
import {
    githubAuthenticated,
    githubAuthenticatedCallback,
} from "../shared/middlewares/GithubAuthenticated";
import { router } from "./index.Routes";

export const loginRouter = () => {
    router.post("/login", LoginControllers.login);
    router.post("/reset", LoginControllers.recovery);
    router.get("/auth/github", githubAuthenticated);
    router.get("/auth/github/callback", githubAuthenticatedCallback);
};
