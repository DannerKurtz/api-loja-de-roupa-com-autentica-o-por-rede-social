import { object } from "yup";
import { BcryptPassword } from "../../../shared/services/BcryptPassword";
import { IUser } from "../../models/UserModel";
import { prisma } from "../../prisma";
import { v4 as uuidv4 } from "uuid";

const select = {
    id: true,
    name: true,
    email: true,
    password: false,
    phone: true,
};

type IUserWithoutId = Omit<IUser, "id">;

export const create = async (data: IUserWithoutId): Promise<IUser | Error> => {
    try {
        const user: IUser = {
            id: uuidv4(),
            ...data,
        };
        
        const emailVerify = await prisma.users.findMany({
            where: { email: user.email },
        });

        if (emailVerify) return new Error("E-mail já cadastrado");

        const passwordHash = await BcryptPassword.passwordHashed(data.password);
        user.password = passwordHash;

        const createUser = await prisma.users.create({
            data: user,
            select: select,
        });

        console.log(typeof createUser);
        if (createUser instanceof object) return createUser;

        return new Error("Erro ao criar usuário");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao criar usuário");
    }
};
