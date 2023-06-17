import Express from "express";
import Connection from "./db/Connection";
import routes from "./routes";
import cors from "cors";

const app = Express();

app.use(Express.json());
app.use(cors());
app.use(routes);

app.listen(3000 || process.env.SERVER_PORT, () => {
  console.log("Servidor rodando na Porta:", process.env.SERVER_PORT);
  Connection;
});
