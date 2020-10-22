const seriesControl = require('./series.controles');

exports.serieA = (req, res) => {
    let url =`${process.env.URL_SERIE_A}`;
    let arq = `${process.env.NAME_SERIE_A}.json`;
    seriesControl.serie(req, res, url, arq);
}