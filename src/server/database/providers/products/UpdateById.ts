import { IProducts } from "../../models/ProductModel";
import { prisma } from "../../prisma";

type IUserWithoutId = Omit<IProducts, "id">;
export const updatedById = async (
    id: number,
    data: IUserWithoutId
): Promise<IProducts | Error> => {
    try {
        const productUpdated = await prisma.products.update({
            data: data,
            where: { id: Number(id) },
        });

        if (productUpdated) {
            return productUpdated;
        }

        return new Error("Erro ao atualizar!");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar o usuário");
    }
};
