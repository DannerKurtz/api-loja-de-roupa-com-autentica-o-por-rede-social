import { router } from "./index.Routes";
import { ProductsControllers } from "../controllers/products";
import { ensureAuthenticated } from "../shared/middlewares/EnsureAuthenticated";
import { permission } from "../shared/middlewares/PermissionValidation";

export const productRouter = async () => {
    router.post(
        "/products",
        ensureAuthenticated,
        await permission("productCreate"),
        ProductsControllers.createValidation,
        ProductsControllers.create
    );
    router.get("/products", ProductsControllers.getAll);
    router.get(
        "/products/:id",
        ProductsControllers.getByIdValidation,
        ProductsControllers.getById
    );
    router.put(
        "/products/:id",
        ensureAuthenticated,
        await permission("productUpdate"),
        ProductsControllers.UpdatedByIdValidation,
        ProductsControllers.updatedById
    );
    router.delete(
        "/products/:id",
        ensureAuthenticated,
        await permission("productDelete"),
        ProductsControllers.deleteValidation,
        ProductsControllers.deleteById
    );
};
