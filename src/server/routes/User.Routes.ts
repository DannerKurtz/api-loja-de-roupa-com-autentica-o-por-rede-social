import { router } from "./index.Routes";
import { UserControllers } from "../controllers/users";
import { ensureAuthenticated } from "../shared/middlewares/EnsureAutenticated";

export const userRouter = () => {
    router.post(
        "/user",
        UserControllers.createValidation,
        UserControllers.create
    );
    router.get("/user", ensureAuthenticated, UserControllers.getAll);
    router.get(
        "/user/:id",
        ensureAuthenticated,
        UserControllers.getByIdValidation,
        UserControllers.getById
    );
    router.put(
        "/user/:id",
        ensureAuthenticated,
        UserControllers.UpdatedByIdValidation,
        UserControllers.updatedById
    );
    router.delete(
        "/user/:id",
        ensureAuthenticated,
        UserControllers.deleteValidation,
        UserControllers.deleteById
    );
};
