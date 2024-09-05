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

type IPermissionWithoutId = Omit<IPermission, "id" | "password">;
export const updatedById = async (
    id: string,
    data: IPermissionWithoutId
): Promise<IPermission | Error> => {
    try {
        const userUpdated = await prisma.permissions.update({
            data: data,
            where: { id: id },
            select: select,
        });

        if (userUpdated) {
            return userUpdated;
        }

        return new Error("Erro ao atualizar!");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao atualizar a permissão");
    }
};
