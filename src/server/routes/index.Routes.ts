import { Router } from "express";
import { userRouter } from "./User.Routes";

export const router = Router();

router.get("/", (req, res) => {
    res.send("Servidor Funcionando");
});

userRouter();
