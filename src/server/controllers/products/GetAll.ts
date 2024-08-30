import { Request, Response } from "express";
import { ProductsProvider } from "../../database/providers/products";
import { StatusCodes } from "http-status-codes";

export const getAll = async (req: Request, res: Response) => {
    const users = await ProductsProvider.getAll();

    return res.status(StatusCodes.ACCEPTED).json(users);
};
