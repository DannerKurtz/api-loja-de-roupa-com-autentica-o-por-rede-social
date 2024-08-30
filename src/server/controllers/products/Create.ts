/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as yup from "yup";
import { IProducts } from "../../database/models/ProductModel";
import { Request, Response } from "express";
import { ProductsProvider } from "../../database/providers/products";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";

interface IBodyProps extends Omit<IProducts, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
            image_url: yup.string().required(),
            price: yup.number().required(),
        })
    ),
}));

export const create = async (
    req: Request<{}, {}, IBodyProps>,
    res: Response
) => {
    const result = await ProductsProvider.create(req.body);
    if (result instanceof Error)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: result.message });

    return res.status(StatusCodes.CREATED).json(result);
};
