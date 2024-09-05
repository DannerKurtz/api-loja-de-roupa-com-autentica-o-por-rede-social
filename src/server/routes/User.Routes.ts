import { router } from "./index.Routes";
import { UserControllers } from "../controllers/users";
import { ensureAuthenticated } from "../shared/middlewares/EnsureAuthenticated";
import { permission } from "../shared/middlewares/PermissionValidation";

export const userRouter = async () => {
    router.post(
        "/user",
        UserControllers.createValidation,
        UserControllers.create
    );
    router.get(
        "/user",
        ensureAuthenticated,
        await permission("userRead"),
        UserControllers.getAll
    );
    router.get(
        "/user/:id",
        ensureAuthenticated,
        UserControllers.getByIdValidation,
        await permission("userRead"),
        UserControllers.getById
    );
    router.put(
        "/user/:id",
        ensureAuthenticated,
        await permission("userUpdate"),
        UserControllers.UpdatedByIdValidation,
        UserControllers.updatedById
    );
    router.delete(
        "/user/:id",
        ensureAuthenticated,
        await permission("userDelete"),
        UserControllers.deleteValidation,
        UserControllers.deleteById
    );
};
