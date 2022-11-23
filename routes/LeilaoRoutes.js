const express = require('express');
const router = express.Router();
const {listarLeilao, salvarLeilao, atualizarLeilao, pegaLeilaoId,removerLeilao, efetuarLance} = require('../controllers/LeilaoController');

router.get('/leiloes',listarLeilao).post('/leiloes',salvarLeilao);
router.put('/leiloes/:id',atualizarLeilao).get('/leiloes/:id',pegaLeilaoId).delete('/produtos/:id',removerLeilao);
router.put('/lance/leiloes/:id',efetuarLance);
module.exports = router;