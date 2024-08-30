/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import * as yup from "yup";
import { ProductsProvider } from "../../database/providers/products";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";
import { IProducts } from "../../database/models/ProductModel";

type IBodyProps = Omit<IProducts, "id">;

interface IParams {
    id?: number;
}

export const UpdatedByIdValidation = validation((getSchema) => ({
    params: getSchema<IParams>(
        yup.object().shape({
            id: yup.number().required().moreThan(0),
        })
    ),
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
            image_url: yup.string().required(),
            price: yup.number().required(),
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
    const userUpdated = await ProductsProvider.updatedById(
        req.params.id,
        req.body
    );

    if (userUpdated instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: userUpdated });
    }
    return res.status(StatusCodes.OK).json(userUpdated);
};
