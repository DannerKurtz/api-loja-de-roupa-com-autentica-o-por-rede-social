import { OAuth2Client, TokenPayload } from "google-auth-library";

const CLIENT_ID = process.env.CLIENT_ID_GOOGLE;

const client = new OAuth2Client(CLIENT_ID);

export const verifyToken = async (
    idToken: string
): Promise<Error | TokenPayload> => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            console.log("erro no payload");
            return new Error("erro no payload");
        }

        return payload;
    } catch (error) {
        console.log(error);
        return new Error("erro na validação do token google");
    }
};
