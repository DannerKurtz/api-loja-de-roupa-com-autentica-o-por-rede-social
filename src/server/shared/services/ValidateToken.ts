import { JWTService } from "../services/JWTService";
import { verifyToken } from "../services/GoogleAuthLibrary";
import { getByEmail } from "../../database/providers/login/getByEmail";


export const validateToken = async (token: string): Promise<string | Error> => {
    const tokenVerifyApplication = await JWTService.verify(token);

    if (
        !(
            tokenVerifyApplication === "JWT_SECRET_NOT_FOUND" ||
            tokenVerifyApplication === "INVALID_TOKEN"
        )
    ) {
        return tokenVerifyApplication.uid;
    }

    const tokenVerifyGoogle = await verifyToken(token);
    if (!(tokenVerifyGoogle instanceof Error)) {
        const emailGoogle = await getByEmail(String(tokenVerifyGoogle.email));
        if (!(emailGoogle instanceof Error)) {
            return emailGoogle.id;
        } else {
            return new Error("TOKEN NOT FOUND GOOGLE");
        }
    }

    return new Error("TOKEN NOT FOUND");
};

