import { prisma } from "../../prisma";

export const getAll = async () => {
    try {
        const result = await prisma.products.findMany({});

        if (result) return result;

        return new Error("Erro ao consultar os usuários");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar os usuários");
    }
};
