import { IUser } from "../../database/models/UserModel";
import { Request, Response } from "express";
import { LoginProvider } from "../../database/providers/login";
import { StatusCodes } from "http-status-codes";
import { BcryptPassword } from "../../shared/services/BcryptPassword";
import { JWTService } from "../../shared/services/JWTService";

type IBodyProps = Omit<IUser, "id" | "name" | "phone">;
type ILogin = Omit<IUser, "phone">;

export const login = async (req: Request<IBodyProps>, res: Response) => {
    const { email, password } = req.body;

    const verifyEmail: ILogin | Error = await LoginProvider.getByEmail(email);

    if (verifyEmail instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "E-mail ou senha inválidos",
            },
        });
    }

    const verifyPassword = await BcryptPassword.passwordVerify(
        password,
        verifyEmail.password
    );

    if (!verifyPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "E-mail ou senha inválidos",
            },
        });
    }

    const token = JWTService.login({ uid: verifyEmail.id });

    return res.status(StatusCodes.ACCEPTED).send({ token });
};
