require("dotenv").config();
const express=require("express");
const app=express();
app.use(express.json());
const { connection, authenticate } = require("./database/database");

authenticate(connection);
const Cliente=require("./database/cliente");
const Endereco=require("./database/cliente");






app.listen(3000, () => {
    connection.sync({force: true});
    console.log("Servidor rodando em http://localhost:3000/");
  });