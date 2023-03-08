const express = require('express');
const { excluirCompra } = require('../controllers/compras.controller');
const router = express.Router();
const comprasController = require('../controllers/compras.controller');

// Rota de criar nova compra
router.post('/', comprasController.criarCompra);

// Rota de alterar a compra
router.put('/:id', comprasController.alterarCompra);

// Rota de excluir a compra

// Rota de pegar todas as compras 

// Rota pegar todas as compras de um usuario especifico

module.exports = router;