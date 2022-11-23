const express = require('express');
const router = express.Router();
const {listarUnidadesFilantropicas,salvarUnidadeFilantropica,atualizarUnidadeFilantropoca} = require('../controllers/UnidadeFilantropicaController');

router.get('/',listarUnidadesFilantropicas).post('/',salvarUnidadeFilantropica);
router.put('/:id',atualizarUnidadeFilantropoca);

module.exports = router;