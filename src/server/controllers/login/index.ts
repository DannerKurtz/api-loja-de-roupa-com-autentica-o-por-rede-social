import * as login from "./Login";
import * as newPassword from "./PasswordRecovery";

export const LoginControllers = {
    ...login,
    ...newPassword,
};
