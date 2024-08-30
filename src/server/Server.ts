import express from "express";
import { router } from "./routes/index.Routes";
import "./shared/services/TranslationsYup";
// import cors from "cors";

const server = express();

server.use(express.json());
server.use(router);

export { server };
