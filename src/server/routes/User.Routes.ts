import { router } from "./index.Routes";
import { UserControllers } from "../controllers/users";

export const userRouter = () => {
    router.post(
        "/user",
        UserControllers.createValidation,
        UserControllers.create
    );
    router.get("/user", UserControllers.getAll);
    router.get(
        "/user/:id",
        UserControllers.getByIdValidation,
        UserControllers.getById
    );
    router.put(
        "/user/:id",
        UserControllers.UpdatedByIdValidation,
        UserControllers.updatedById
    );
    router.delete(
        "/user/:id",
        UserControllers.deleteValidation,
        UserControllers.deleteById
    );
};
