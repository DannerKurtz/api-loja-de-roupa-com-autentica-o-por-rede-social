import { BcryptPassword } from "./BcryptPassword";
import { getByEmail } from "../../database/providers/login/getByEmail";
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";
import { prisma } from "../../database/prisma";

export const passwordRecovery = async (
    email: string
): Promise<Error | object> => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465", 10),
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL_USERNAME,
            pass: process.env.SMTP_EMAIL_PASSWORD,
        },
    });
    try {
        const emailVerify = await getByEmail(email);

        if (emailVerify instanceof Error) {
            return new Error("Erro ao recuperar a senha.");
        }

        const newPassword = await crypto.randomBytes(6).toString("hex");
        const newPasswordHash = await BcryptPassword.passwordHashed(
            newPassword
        );
        transport
            .sendMail({
                from: process.env.EMAIL_SEND,
                to: emailVerify.email,
                subject: "Subject of the email",
                html: `<b>Sua nova senha é: ${newPassword}</b>`,
            })
            .then(async () => {
                const updatePassword = await prisma.users.update({
                    data: { password: newPasswordHash },
                    where: { id: emailVerify.id },
                });
                return updatePassword;
            });
        return new Error("Erro ao recuperar a senha: ");
    } catch (error) {
        console.log(error);
        return new Error("Erro ao recuperar a senha.");
    }
};
