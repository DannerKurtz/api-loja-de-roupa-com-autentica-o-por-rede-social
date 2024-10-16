import { Request, Response } from "express";
import { UserControllers } from "../../src/server/controllers/users";
import { UserProvider } from "../../src/server/database/providers/users";

jest.mock("../../src/server/database/providers/users", () => ({
    UserProvider: {
        updatedById: jest.fn(),
    },
}));

describe("Teste de atualização de usuário por id", () => {
    test("Teste de atualização com sucesso", async () => {
        (UserProvider.updatedById as jest.Mock).mockResolvedValue({
            id: "1",
            name: "Teste",
            email: "teste@exemple.com",
        });
        const req = {
            params: {
                id: 1,
            },
            body: {
                name: "Teste",
                email: "teste@exemple.com",
                password: "123456",
            },
            get: jest.fn(),
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await UserControllers.updatedById(req, res);

        console.log(res.json);

        expect(UserProvider.updatedById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                id: "1",
                name: "Teste",
                email: "teste@exemple.com",
            })
        );
    });
});
