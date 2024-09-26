import axios from "axios";
import { getByEmail } from "../../database/providers/login/getByEmail";
import { JWTService } from "./JWTService";

interface Email {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
}

interface ResponseData {
    data: Email[];
}

export const verifyGit = async (token: string) => {
    const result = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
            code: token,
            client_id: process.env.CLIENT_ID_GITHUB,
            client_secret: process.env.CLIENT_SECRET_GITHUB,
        }
    );

    console.log(result);
};

export const validateToken = async (accessToken: string) => {
    try {
        const response: ResponseData = await axios.get(
            "https://api.github.com/user/emails",
            {
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            }
        );
        // Se a resposta for bem-sucedida, o token é válido

        const email = response.data[0].email;

        const emailVerify = await getByEmail(email);

        if (emailVerify instanceof Error) {
            return new Error("Email não encontrado ou não cadastrado");
        }

        const tokenGenerateJWT = await JWTService.login({
            uid: emailVerify.id,
        });

        if (tokenGenerateJWT === undefined) {
            return new Error("Email não encontrado ou não cadastrado");
        }

        return tokenGenerateJWT;
    } catch (error) {
        return new Error(String(error));
    }
};
