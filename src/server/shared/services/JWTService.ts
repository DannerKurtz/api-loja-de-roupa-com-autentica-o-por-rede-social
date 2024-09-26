import * as jwt from "jsonwebtoken";

export interface IJwtData {
    uid: string;
}

const login = (data: IJwtData): string | "JWT_SECRET_NOT_FOUND" => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const verify = (
    token: string
): IJwtData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" => {
    if (!process.env.JWT_SECRET) return "JWT_SECRET_NOT_FOUND";

    try {
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

        if (typeof decoded === "string") return "INVALID_TOKEN";

        return decoded as IJwtData;
    } catch (error) {
        console.log(error);
        return "INVALID_TOKEN";
    }
};

export const JWTService = {
    login,
    verify,
};
