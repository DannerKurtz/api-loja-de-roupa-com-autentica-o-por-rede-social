import { Request, Response } from "express";
import { PermissionProvider } from "../../database/providers/permissions";
import { StatusCodes } from "http-status-codes";

export const getAll = async (req: Request, res: Response) => {
    const permission = await PermissionProvider.getAll();

    return res.status(StatusCodes.ACCEPTED).json(permission);
};
