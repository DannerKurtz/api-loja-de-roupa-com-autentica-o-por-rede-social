import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { validateToken } from "../services/ValidateToken";

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: "Não autenticado" },
        });
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: "Não autenticado" },
        });
    }

    const tokenAccepted = await validateToken(token);

    if (tokenAccepted instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: tokenAccepted.message },
        });
    }

    req.headers.idUser = tokenAccepted;

    return next();
};
