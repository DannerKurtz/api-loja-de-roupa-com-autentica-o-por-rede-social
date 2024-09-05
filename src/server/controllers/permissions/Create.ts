/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as yup from "yup";
import { IPermission } from "../../database/models/PermissionModel";
import { Request, Response } from "express";
import { PermissionProvider } from "../../database/providers/permissions";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";

interface IBodyProps extends Omit<IPermission, "id"> {}

export const createValidation = validation((getSchema) => ({
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

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await PermissionProvider.create(req.body);
    if (result instanceof Error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: result.message });

    return res.status(StatusCodes.CREATED).json(result);
};
