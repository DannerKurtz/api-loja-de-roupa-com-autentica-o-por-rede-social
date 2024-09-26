import axios from "axios";
import { RequestHandler } from "express";
import * as qs from "qs";
import { validateToken } from "../services/GitHubAuth";
import { StatusCodes } from "http-status-codes";

const GITHUB_CLIENT_ID = process.env.CLIENT_ID_GITHUB;
const GITHUB_CLIENT_SECRET = process.env.CLIENT_SECRET_GITHUB;

export const githubAuthenticated: RequestHandler = async (req, res) => {
    const redirect_uri = "http://localhost:3000/auth/github/callback";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        redirect_uri
    )}`;
    res.redirect(githubAuthUrl);
};

export const githubAuthenticatedCallback: RequestHandler = async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            qs.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code,
            }),
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );
        console.log(tokenResponse.data.email);
        const accessToken = tokenResponse.data.access_token;

        const token = await validateToken(accessToken);

        if (token instanceof Error)
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .send({ message: token });

        return res.status(StatusCodes.ACCEPTED).send({ token });
    } catch (error) {
        console.error("Error getting access token:", error);
        res.status(500).send("Authentication failed");
    }
};
