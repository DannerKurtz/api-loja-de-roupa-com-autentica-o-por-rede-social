import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import * as yup from "yup";
import { PermissionProvider } from "../../database/providers/permissions";
import { StatusCodes } from "http-status-codes";

interface IQueryParams {
    id?: string;
}

export const deleteValidation = validation((getSchema) => ({
    params: getSchema<IQueryParams>(
        yup.object().shape({
            id: yup.string().required(),
        })
    ),
}));

export const deleteById = async (req: Request<IQueryParams>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado.',
            },
        });
    }
    const deletePermission = await PermissionProvider.deleteById(req.params.id);

    if (deletePermission instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: deletePermission });
    }

    return res.status(StatusCodes.OK).json({ userDelete: deletePermission });
};
