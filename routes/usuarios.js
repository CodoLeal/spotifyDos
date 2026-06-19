const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const usuarioController = require('../controllers/usuarioController');

router.post('/login', authController.procesarLogin);

router.get('/', usuarioController.listarUsuarios);
router.post('/', usuarioController.crearUsuario);

module.exports = router;