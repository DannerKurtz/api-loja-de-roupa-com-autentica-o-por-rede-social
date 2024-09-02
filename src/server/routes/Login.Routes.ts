import { LoginControllers } from "../controllers/login";
import { router } from "./index.Routes";

export const loginRouter = () => {
    router.post("/login", LoginControllers.login);
    router.post("/reset", LoginControllers.recovery);
};
