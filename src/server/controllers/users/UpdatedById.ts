/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import * as yup from "yup";
import { UserProvider } from "../../database/providers/users";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { IUser } from "../../database/models/UserModel";

type IBodyProps = Omit<IUser, "id">;

interface IParams {
    id?: string;
}

export const UpdatedByIdValidation = validation((getSchema) => ({
    params: getSchema<IParams>(
        yup.object().shape({
            id: yup.string().required(),
        })
    ),
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
            email: yup.string().email().required().min(6),
            password: yup.string().required().min(6),
            phone: yup.string().nullable(),
        })
    ),
}));

export const updatedById = async (
    req: Request<IParams, {}, IBodyProps>,
    res: Response
) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }
    const userUpdated = await UserProvider.updatedById(req.params.id, req.body);

    if (userUpdated instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: userUpdated });
    }
    return res.status(StatusCodes.OK).json(userUpdated);
};
