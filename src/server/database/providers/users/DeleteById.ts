import { prisma } from "../../prisma";

export const deleteById = async (id: string): Promise<object | Error> => {
    try {
        const deleteUser = await prisma.users.delete({ where: { id: id } });

        if (deleteUser) {
            return deleteUser;
        }

        return new Error("Erro ao deletar o usuário");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao deletar o usuário");
    }
};
