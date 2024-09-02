/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { passwordRecovery } from "../../shared/services/PasswordRecovery";
import { StatusCodes } from "http-status-codes";

interface IBodyProps {
    email: string;
}

export const recovery = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const email = req.body.email;

    const password = passwordRecovery(email);

    if (password instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Erro ao solicitar nova senha!" });
    }

    return res
        .status(StatusCodes.OK)
        .json({ message: "E-mail enviado com sucesso" });
};
