/* eslint-disable no-prototype-builtins */

import { prisma } from "../../database/prisma";

const select = {
    id: false,
    name: false,
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

export const validation = (
    permission: { [key: string]: boolean },
    access: string
) => {
    return permission.hasOwnProperty(access) && permission[access] === true;
};

export const getByIdPermission = async (id: string) => {
    const permissions = await prisma.permissions.findUnique({
        where: { id: id },
        select: select,
    });

    return permissions;
};
