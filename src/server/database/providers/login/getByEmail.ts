import { IUser } from "../../models/UserModel";
import { prisma } from "../../prisma";

type ILogin = Omit<IUser, "phone">;

export const getByEmail = async (email: string): Promise<Error | ILogin> => {
    try {
        const emailVerify = await prisma.users.findUnique({
            where: { email: email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });

        if (!emailVerify) {
            return new Error("Email não encontrado!");
        }

        return emailVerify;
    } catch (error) {
        console.log(error);
        return new Error("Email não encontrado!");
    }
};
