const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


function lerArquivo(arq, res, resultado) {
    fs.readFile(arq, "utf-8", (err, data) => {
        if(err){return "Não encontrei nada!"}
        if(JSON.parse(data) === null) {
            return res.send('Arquivo sem conteúdo!');
        } else {
            var jsonData = JSON.parse(data);
            let results = JSON.stringify(resultado);
            if(results !== data){
                escreverArquivo(arq, res ,results);
                jsonData = JSON.parse(results);
            } 
        }
        return res.send(jsonData);  
    })
}

function escreverArquivo (arq, res, result){
    fs.writeFile(arq, result, (err) => {
        if(err){return "Erro ao gravar arquivo"}
    })
}

exports.serie = (req, res, url, arq) => {
    request(url, function (error, response, html) {
        if (!error) {
            const $ = cheerio.load(html);
            var resultado = [];
            $("table tr:nth-child(2n+1)").each(function (i) {
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
            lerArquivo(arq,res,resultado);
        }
    })
}