/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UserControllers } from "../../src/server/controllers/users";
import { Request, Response } from "express";
import { UserProvider } from "../../src/server/database/providers/users";

jest.mock("../../src/server/database/providers/users", () => ({
    UserProvider: {
        getById: jest.fn(),
    },
}));

describe("Teste de busca por id", () => {
    test("GET - buscando usuário por id", async () => {
        (UserProvider.getById as jest.Mock).mockResolvedValue({
            id: "2",
            name: "Teste 2",
            email: "teste2@exemple.com",
        });

        const req = {
            params: {
                id: "2",
            },
            get: jest.fn(),
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await UserControllers.getById(req, res);

        expect(UserProvider.getById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "2",
                name: "Teste 2",
                email: "teste2@exemple.com",
            })
        );
    });
});
