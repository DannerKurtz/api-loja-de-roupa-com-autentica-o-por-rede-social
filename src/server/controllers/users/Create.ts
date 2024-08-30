/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as yup from "yup";
import { IUser } from "../../database/models/UserModel";
import { Request, Response } from "express";
import { UserProvider } from "../../database/providers/users";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";

interface IBodyProps extends Omit<IUser, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
            email: yup.string().email().required().min(6),
            password: yup.string().required().min(6),
            phone: yup.string().nullable(),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await UserProvider.create(req.body);
    if (result instanceof Error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: result.message });

    return res.status(StatusCodes.CREATED).json(result);
};
