import Express from "express";
import Connection from "./db/Connection";
import routes from "./routes";

const app = Express();

app.use(Express.json());
app.use(routes);

app.listen(3000 || process.env.SERVER_PORT, () => {
  console.log("Servidor rodando na Porta:", process.env.SERVER_PORT);
  Connection;
});
