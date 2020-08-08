const express = require('express');
const router = express.Router();

const { check } = require('express-validator')

const adminAuthController = require('../controllers/adminAuthController')

const isAdmin = require('../middlewares/isAdmin')

const adminAuthValidator = [
  check('login').notEmpty().withMessage('Login field must be field.'),
  check('password').notEmpty().withMessage('Password field must be field.')
]

router.get('/login', adminAuthController.showLogin)

router.get('/', isAdmin, adminAuthController.dashboard)

router.post('/login', adminAuthValidator, adminAuthController.login)

module.exports = router;
