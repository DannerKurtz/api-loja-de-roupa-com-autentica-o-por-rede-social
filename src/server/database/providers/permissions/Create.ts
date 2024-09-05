import { IPermission } from "../../models/PermissionModel";
import { prisma } from "../../prisma";
import { v4 as uuidv4 } from "uuid";

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

type IPermissionWithoutId = Omit<IPermission, "id">;

export const create = async (
    data: IPermissionWithoutId
): Promise<IPermission | Error> => {
    try {
        const permissionRole: IPermission = {
            id: uuidv4(),
            ...data,
        };

        const createPermission = await prisma.permissions.create({
            data: permissionRole,
            select: select,
        });

        if (typeof createPermission === "object") return createPermission;

        return new Error("Erro ao criar a permissão");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao criar a permissão");
    }
};
