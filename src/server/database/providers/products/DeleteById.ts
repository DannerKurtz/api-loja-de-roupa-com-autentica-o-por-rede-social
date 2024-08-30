import { prisma } from "../../prisma";

export const deleteById = async (id: number): Promise<object | Error> => {
    try {
        const deleteProduct = await prisma.products.delete({
            where: { id: Number(id) },
        });

        if (deleteProduct) {
            return deleteProduct;
        }

        return new Error("Erro ao deletar o usuário");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao deletar o usuário");
    }
};
