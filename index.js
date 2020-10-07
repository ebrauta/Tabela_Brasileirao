const express = require("express");
require('dotenv/config');
const fs = require("fs");
const cors = require("cors");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Passo 1
app.get("/", function (req, res) {
  url =
    "https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a";
  request(url, function (error, response, html) {
    // Passo 2
    // Assegurar que não tenha erros para fazer a raspagem de dados com sucesso
    console.log(error)
    if (!error) {
      const $ = cheerio.load(html);
      // Objeto que irá armazenar a tabela
      var resultado = [];
      // Passo 3
      // Manipulando o seletor específico para montar nossa estrutura
      // Escolhi não selecionar a primeira linha porque faz parte do header da tabela
      $("table tr:nth-child(2n+1)").each(function (i) {
        // Obtendo as propriedades da tabela.
        // O método .trim() garante que irá remover espaço em branco
        const posicao = $(this).find("td:first-child b").eq(0).text().trim("\n");
        const time = $(this).find("td:first-child span").eq(1).text().trim("\n");
        const pontuacao = Number($(this).find("th").eq(0).text().trim("\n"));
        const jogos = Number($(this).find("td:nth-child(3)").eq(0).text().trim("\n")); 
        const vitorias = Number($(this).find("td:nth-child(4)").eq(0).text().trim("\n")); 
        const empates = Number($(this).find("td:nth-child(5)").eq(0).text().trim("\n")); 
        const derrotas = Number($(this).find("td:nth-child(6)").eq(0).text().trim("\n")); 
        const golspro = Number($(this).find("td:nth-child(7)").eq(0).text().trim("\n")); 
        const golscontra = Number($(this).find("td:nth-child(8)").eq(0).text().trim("\n")); 
        const saldo = Number($(this).find("td:nth-child(9)").eq(0).text().trim("\n")); 
        const amarelos = Number($(this).find("td:nth-child(10)").eq(0).text().trim("\n")); 
        const vermelhos = Number($(this).find("td:nth-child(11)").eq(0).text().trim("\n")); 
        const aproveitamento = Number($(this).find("td:nth-child(12)").eq(0).text().trim("\n")); 

        // Inserindo os dados obtidos no nosso objeto

        if(time){
            resultado.push({
                posicao: posicao, 
                time: time,
                pontuacao: pontuacao,
                jogos: jogos,
                vitorias: vitorias,
                empates: empates,
                derrotas: derrotas,
                golspro: golspro,
                golscontra: golscontra,
                saldo: saldo,
                amarelos: amarelos,
                vermelhos: vermelhos,
                aproveitamento: aproveitamento
            });
        }
      });
    }
    // Passo 4
    fs.writeFile(
        "resultado.json",
        JSON.stringify(resultado),(err) => {
          console.log("JSON escrito com sucesso! O arquivo está na raiz do projeto.");
        }
      );
  });
  fs.readFile("resultado.json", "utf-8", (err, data) => {
      if(err){return console.log("Erro ao ler arquivo")}
      var jsonData = JSON.parse(data);
      res.status(200).send(jsonData);
  })
});

app.listen(PORT, () => {
  console.log(`API ${process.env.APP_NAME} - Servidor iniciado na porta ${PORT}`);
});
