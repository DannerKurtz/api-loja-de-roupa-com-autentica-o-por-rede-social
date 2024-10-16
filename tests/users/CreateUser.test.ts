/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { UserControllers } from "../../src/server/controllers/users";
import { IUser } from "../../src/server/database/models/UserModel";
import { UserProvider } from "../../src/server/database/providers/users";

jest.mock("../../src/server/database/providers/users/Create.ts", () => ({
    create: jest.fn().mockResolvedValue({
        id: "1",
        name: "Teste",
        email: "teste@exemple.com",
        password: "hashed_password",
    }),
}));

describe("Teste de criação de usuários", () => {
    test("Sucesso ao criar usuário", async () => {
        interface IBodyProps extends Omit<IUser, "id"> {}
        const req = {
            body: {
                name: "Teste",
                email: "teste@exemple.com",
                password: "123456",
            },
            get: jest.fn(), 
        } as unknown as Request<{}, {}, IBodyProps>;

        const res = {
            status: jest.fn().mockReturnThis(), 
            json: jest.fn(),
        } as unknown as Response;

        await UserControllers.create(req, res);

        expect(UserProvider.create).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: "Teste",
                email: "teste@exemple.com",
            })
        );
    });
});
