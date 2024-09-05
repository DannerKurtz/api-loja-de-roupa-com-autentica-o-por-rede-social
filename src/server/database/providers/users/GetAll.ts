import { prisma } from "../../prisma";

const select = {
    id: true,
    name: true,
    email: true,
    password: false,
    phone: true,
    permissionId: true,
};

export const getAll = async () => {
    try {
        const result = await prisma.users.findMany({ select: select });

        if (result) return result;

        return new Error("Erro ao consultar os usuários");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar os usuários");
    }
};
