"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../../middlewares/validar-campos");
const validar_jwt_1 = require("../../middlewares/validar-jwt");
const login_controller_1 = require("./login.controller");
const router = express_1.Router();
router.get('/renew', [validar_jwt_1.validarJWT], login_controller_1.renewToken);
router.post('/', [
    express_validator_1.check('usuario', 'El usuario es requerido').notEmpty(),
    express_validator_1.check('password', 'El password es requerido').notEmpty(),
    validar_campos_1.validarCampos
], login_controller_1.login);
exports.default = router;
//# sourceMappingURL=login.routes.js.map