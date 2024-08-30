import { IProducts } from "../../models/ProductModel";
import { prisma } from "../../prisma";

export const getById = async (id: number): Promise<IProducts | Error> => {
    try {
        const product = await prisma.products.findUnique({
            where: { id: Number(id) },
        });
        if (!product) return new Error("Erro ao consultar o usuário");
        return product;
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar o usuário");
    }
};
