import { router } from "./index.Routes";
import { ProductsControllers } from "../controllers/products";

export const productRouter = () => {
    router.post(
        "/products",
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
        ProductsControllers.UpdatedByIdValidation,
        ProductsControllers.updatedById
    );
    router.delete(
        "/products/:id",
        ProductsControllers.deleteValidation,
        ProductsControllers.deleteById
    );
};
