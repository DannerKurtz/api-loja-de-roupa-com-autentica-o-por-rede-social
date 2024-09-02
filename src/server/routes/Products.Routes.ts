import { router } from "./index.Routes";
import { ProductsControllers } from "../controllers/products";
import { ensureAuthenticated } from "../shared/middlewares/EnsureAutenticated";

export const productRouter = () => {
    router.post(
        "/products",
        ensureAuthenticated,
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
        ProductsControllers.UpdatedByIdValidation,
        ProductsControllers.updatedById
    );
    router.delete(
        "/products/:id",
        ensureAuthenticated,
        ProductsControllers.deleteValidation,
        ProductsControllers.deleteById
    );
};
