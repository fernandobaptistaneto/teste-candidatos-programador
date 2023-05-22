import { appDataSource } from "./data-source";

appDataSource
  .initialize()
  .then(() => {
    console.log("Banco Iniciado com Sucesso!");
  })
  .catch((err) => {
    console.log("error ao iniciar o banco:", err);
  });

export default appDataSource;
