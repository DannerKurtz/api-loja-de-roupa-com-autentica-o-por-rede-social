import { IPermission } from "../../models/PermissionModel";
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

export const getById = async (id: string): Promise<IPermission | Error> => {
    try {
        const permission = await prisma.permissions.findFirst({
            where: { id: id },
            select: select,
        });
        if (!permission) return new Error("Erro ao consultar a permissão");
        return permission;
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar o usuário");
    }
};
