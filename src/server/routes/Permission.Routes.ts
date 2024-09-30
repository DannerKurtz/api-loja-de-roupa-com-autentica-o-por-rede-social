import { PermissionControllers } from "../controllers/permissions";
import { ensureAuthenticated } from "../shared/middlewares/EnsureAuthenticated";
import { permission } from "../shared/middlewares/PermissionValidation";
import { router } from "./index.Routes";

export const permissionRoute = async () => {
    router.post(
        "/permission",
        ensureAuthenticated,
        await permission("permissionCreate"),
        PermissionControllers.createValidation,
        PermissionControllers.create
    );
    router.get(
        "/permission",
        ensureAuthenticated,
        await permission("permissionRead"),
        PermissionControllers.getAll
    );
    router.get(
        "/permission/:id",
        ensureAuthenticated,
        await permission("permissionRead"),
        PermissionControllers.getByIdValidation,
        PermissionControllers.getById
    );
    router.put(
        "/permission/:id",
        ensureAuthenticated,
        await permission("permissionUpdate"),
        PermissionControllers.UpdatedByIdValidation,
        PermissionControllers.updatedById
    );
    router.delete(
        "/permission/:id",
        ensureAuthenticated,
        await permission("permissionDelete"),
        PermissionControllers.deleteValidation,
        PermissionControllers.deleteById
    );
};


