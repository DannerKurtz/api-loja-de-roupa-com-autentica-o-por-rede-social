import { IUser } from "../../models/UserModel";
import { prisma } from "../../prisma";

const select = {
    id: true,
    name: true,
    email: true,
    password: false,
    phone: true,
    permissionId: true,
};

export const getById = async (id: string): Promise<IUser | Error> => {
    try {
        const user = await prisma.users.findFirst({
            where: { id: id },
            select: select,
        });
        if (!user) return new Error("Erro ao consultar o usuário");
        return user;
    } catch (error) {
        console.log(error);
        return new Error("Erro ao consultar o usuário");
    }
};
