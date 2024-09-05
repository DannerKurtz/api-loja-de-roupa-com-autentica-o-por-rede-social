/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import * as yup from "yup";
import { PermissionProvider } from "../../database/providers/permissions";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { IPermission } from "../../database/models/PermissionModel";

type IBodyProps = Omit<IPermission, "id">;

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
            name: yup.string().required(),
            productCreate: yup.boolean().required(),
            productRead: yup.boolean().required(),
            productUpdate: yup.boolean().required(),
            productDelete: yup.boolean().required(),
            userCreate: yup.boolean().required(),
            userRead: yup.boolean().required(),
            userUpdate: yup.boolean().required(),
            userDelete: yup.boolean().required(),
            permissionCreate: yup.boolean().required(),
            permissionRead: yup.boolean().required(),
            permissionUpdate: yup.boolean().required(),
            permissionDelete: yup.boolean().required(),
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
    const permissionUpdated = await PermissionProvider.updatedById(
        req.params.id,
        req.body
    );

    if (permissionUpdated instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: permissionUpdated });
    }
    return res.status(StatusCodes.OK).json(permissionUpdated);
};
