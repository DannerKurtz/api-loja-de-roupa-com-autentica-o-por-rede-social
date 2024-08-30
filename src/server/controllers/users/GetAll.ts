import { Request, Response } from "express";
import { UserProvider } from "../../database/providers/users";
import { StatusCodes } from "http-status-codes";

export const getAll = async (req: Request, res: Response) => {
    const users = await UserProvider.getAll();

    return res.status(StatusCodes.ACCEPTED).json(users);
};
