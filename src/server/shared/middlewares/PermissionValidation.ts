import { NextFunction, Request, Response } from "express";
import {
    getByIdPermission,
    validation,
} from "../services/PermissionValidation";
import { StatusCodes } from "http-status-codes";
import { getById } from "../../database/providers/users/GetById";

export const permission = async (permissionUser: string) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        console.log(req.headers);
        console.log(permissionUser);
        const validationUser = await validationPermission(
            String(req.headers.idUser),
            permissionUser
        );

        if (validationUser) {
            return next();
        } else if (req.params.id === req.headers.idUser) {
            return next();
        }

        res.status(StatusCodes.UNAUTHORIZED).json({
            msg: "Acesso não autorizado",
        });
    };
};

const validationPermission = async (idUser: string, permissionUser: string) => {
    const user = await getById(String(idUser));

    if (user instanceof Error) {
        return Error("Erro ao buscar permissão do usuário");
    }
    const permissions = await getByIdPermission(String(user.permissionId));

    const validationUser = await validation(
        Object(permissions),
        permissionUser
    );

    return validationUser;
};
