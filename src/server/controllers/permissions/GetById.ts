import { Request, Response } from "express";
import * as yup from "yup";
import { PermissionProvider } from "../../database/providers/permissions";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";

interface IParams {
    id?: string;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParams>(
        yup.object().shape({
            id: yup.string().required(),
        })
    ),
}));

export const getById = async (req: Request<IParams>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }
    const result = await PermissionProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ Error: result });
    }

    return res.status(StatusCodes.OK).json(result);
};
