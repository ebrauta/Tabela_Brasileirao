const seriesControl = require('./series.controles');

exports.serieB = (req, res) => {
    let url =`${process.env.URL_SERIE_B}`;
    let arq = `${process.env.NAME_SERIE_B}.json`;
    seriesControl.serie(req, res, url, arq);
}