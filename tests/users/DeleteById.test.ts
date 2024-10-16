import { Request, Response } from "express";
import { UserControllers } from "../../src/server/controllers/users";
import { UserProvider } from "../../src/server/database/providers/users";

jest.mock("../../src/server/database/providers/users", () => ({
    UserProvider: {
        deleteById: jest.fn(),
    },
}));

describe("Deletando usuário por id", () => {
    test("Deletando com sucesso", async () => {
        (UserProvider.deleteById as jest.Mock).mockReturnValue({
            id: "1",
            name: "Teste",
            email: "teste@exemple.com",
        });

        const req = {
            params: {
                id: "1",
            },
            get: jest.fn(),
        } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await UserControllers.deleteById(req, res);

        expect(UserProvider.deleteById).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                userDelete: {
                    id: "1",
                    name: "Teste",
                    email: "teste@exemple.com",
                },
            })
        );
    });
});
