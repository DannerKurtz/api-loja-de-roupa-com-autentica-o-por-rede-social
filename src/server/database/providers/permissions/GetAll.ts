import { prisma } from "../../prisma";

const select = {
    id: true,
    name: true,
    users: false,
    productCreate: true,
    productRead: true,
    productUpdate: true,
    productDelete: true,
    userCreate: true,
    userRead: true,
    userUpdate: true,
    userDelete: true,
    permissionCreate: true,
    permissionRead: true,
    permissionUpdate: true,
    permissionDelete: true,
};

export const getAll = async () => {
    try {
        const result = await prisma.permissions.findMany({ select: select });

        if (result) return result;

        return new Error("Erro ao consultar as permissões");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar as permissões");
    }
};
