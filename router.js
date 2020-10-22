const express = require("express");
const path = require('path');
require('dotenv/config');
const router = express.Router();

const serieA_controller = require('./controllers/serieA.controller');
const serieB_controller = require('./controllers/serieB.controller');

router.use('/', express.static(path.join(__dirname + '/public')));
/* router.get('/', (req, res) => {
    res.status(200).send("Campeonato Brasileiro 2020/2021");
}) */

router.get('/serieA', serieA_controller.serieA);
router.get('/serieB', serieB_controller.serieB);

module.exports = router;