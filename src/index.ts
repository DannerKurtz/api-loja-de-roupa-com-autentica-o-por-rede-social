import { server } from "./server/Server";

const startServer = () => {
    server.listen(process.env.PORT_SERVER || 5002, () => {
        console.log("Server On, PORT:", process.env.PORT_SERVER || 3000);
    });
};

startServer();
