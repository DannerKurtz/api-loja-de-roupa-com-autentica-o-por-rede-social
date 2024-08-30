import { Router } from "express";
import { userRouter } from "./User.Routes";
import { loginRouter } from "./Login.Routes";
import { productRouter } from "./Products.Routes";

export const router = Router();

router.get("/", (req, res) => {
    res.send("Servidor Funcionando");
});

userRouter();
loginRouter();
productRouter();
