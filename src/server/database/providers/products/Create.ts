import { IProducts } from "../../models/ProductModel";
import { prisma } from "../../prisma";

type IProductsWithoutId = Omit<IProducts, "id">;

export const create = async (
    data: IProductsWithoutId
): Promise<IProducts | Error> => {
    try {
        const productCreate = await prisma.products.create({ data });

        if (productCreate) {
            return productCreate;
        }

        return new Error("Erro ao criar usuário");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao criar usuário");
    }
};
