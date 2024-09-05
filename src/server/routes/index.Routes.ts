import { Router } from "express";
import { userRouter } from "./User.Routes";
import { loginRouter } from "./Login.Routes";
import { productRouter } from "./Products.Routes";
import { permissionRoute } from "./Permission.Routes";

export const router = Router();

router.get("/", (req, res) => {
    res.send("Servidor Funcionando");
});

userRouter();
loginRouter();
productRouter();
permissionRoute();
