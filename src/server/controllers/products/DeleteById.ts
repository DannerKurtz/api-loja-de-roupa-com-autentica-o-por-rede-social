import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";
import * as yup from "yup";
import { ProductsProvider } from "../../database/providers/products";
import { StatusCodes } from "http-status-codes";

interface IQueryParams {
    id?: number;
}

export const deleteValidation = validation((getSchema) => ({
    params: getSchema<IQueryParams>(
        yup.object().shape({
            id: yup.number().required().moreThan(0),
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
    const deleteUser = await ProductsProvider.deleteById(req.params.id);

    if (deleteUser instanceof Error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: deleteUser });
    }

    return res.status(StatusCodes.OK).json({ userDelete: deleteUser });
};
