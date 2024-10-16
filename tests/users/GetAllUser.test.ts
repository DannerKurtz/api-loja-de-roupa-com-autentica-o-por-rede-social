/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UserControllers } from "../../src/server/controllers/users";
import { Request, Response } from "express";
import { UserProvider } from "../../src/server/database/providers/users";

jest.mock("../../src/server/database/providers/users", () => ({
    UserProvider: {
        getAll: jest.fn(), // Mocka a função getAll
    },
}));

describe("Teste de leitura dos usuários", () => {
    test("GET - pegando todos os usuários", async () => {
        (UserProvider.getAll as jest.Mock).mockResolvedValue([
            {
                id: "1",
                name: "Teste",
                email: "teste@exemple.com",
            },
            {
                id: "2",
                name: "Teste 2",
                email: "teste2@exemple.com",
            },
        ]);

        const req = {
            params: {},
            get: jest.fn(),
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await UserControllers.getAll(req, res);

        expect(UserProvider.getAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(202);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining([
                {
                    id: "1",
                    name: "Teste",
                    email: "teste@exemple.com",
                },
                {
                    id: "2",
                    name: "Teste 2",
                    email: "teste2@exemple.com",
                },
            ])
        );
    });
});
