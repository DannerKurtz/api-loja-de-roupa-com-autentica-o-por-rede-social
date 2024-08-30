import { IUser } from "../../models/UserModel";
import { prisma } from "../../prisma";

const select = {
    id: false,
    name: true,
    email: true,
    password: false,
    phone: true,
};

type IUserWithoutId = Omit<IUser, "id" | "password">;
export const updatedById = async (
    id: string,
    data: IUserWithoutId
): Promise<IUser | Error> => {
    try {
        const user = await prisma.users.findUnique({
            where: { id: id },
            select: {
                email: true,
            },
        });
        if (user?.email !== data.email) {
            const emailVerify = await prisma.users.findMany({
                where: { email: data.email },
            });
            if (!emailVerify) {
                return new Error("Erro email já cadastrado");
            }
        }

        const userUpdated = await prisma.users.update({
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
        return new Error("Erro ao consultar o usuário");
    }
};
