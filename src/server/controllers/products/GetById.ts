import { Request, Response } from "express";
import * as yup from "yup";
import { ProductsProvider } from "../../database/providers/products";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middlewares";

interface IParams {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParams>(
        yup.object().shape({
            id: yup.number().required().moreThan(0),
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
    const result = await ProductsProvider.getById(req.params.id);

    if (result instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ Error: result });
    }

    return res.status(StatusCodes.OK).json(result);
};
