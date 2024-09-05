import { prisma } from "../../prisma";

export const deleteById = async (id: string): Promise<object | Error> => {
    try {
        const deletePermission = await prisma.permissions.delete({ where: { id: id } });

        if (deletePermission) {
            return deletePermission;
        }

        return new Error("Erro ao deletar a permissão");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao deletar a permissão");
    }
};
