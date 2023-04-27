require("dotenv").config();
const express=require("express");
const morgan=require("morgan");
const app=express();
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:3000" }));

const { connection, authenticate } = require("./database/database");
authenticate(connection);

const rotasClientes=require("./routes/clientes");
const rotasPets=require("./routes/pets");
app.use(rotasClientes);
app.use(rotasPets);

app.listen(3001, () => {
    connection.sync();
    console.log("Servidor rodando em http://localhost:3001/");
  });

  