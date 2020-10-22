const express = require("express");
const path = require('path');
require('dotenv/config');
const cors = require("cors");
const app = express();
const Router = require('./router');


//Criação de constante
const PORT = process.env.PORT || 5000;

app.use('/static', express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(Router);

//Conexão servidor
app.listen(PORT, () => {
  console.log(`API ${process.env.APP_NAME} - Servidor iniciado na porta ${PORT}`);
});
