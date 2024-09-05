import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "../services/JWTService";
import { verifyToken } from "../services/GoogleAuthLibrary";
import { getByEmail } from "../../database/providers/login/getByEmail";

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

    const jwtData = JWTService.verify(token);

    if (jwtData === "JWT_SECRET_NOT_FOUND") {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: "Erro ao verificar o token" },
        });
    } else if (jwtData === "INVALID_TOKEN") {
        const googleToken = await verifyToken(token);

        if (googleToken instanceof Error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: { default: "Não autenticado, invalid token" },
            });
        }
        const email = googleToken.email;

        const idUser = await getByEmail(String(email));

        if (idUser instanceof Error) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                errors: { default: "Não autenticado, invalid token" },
            });
        }

        req.headers.idUser = idUser.id;

        return next();
    }

    req.headers.idUser = jwtData.uid;

    return next();
};
