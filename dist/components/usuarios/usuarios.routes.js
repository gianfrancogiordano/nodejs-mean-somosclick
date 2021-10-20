"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../../middlewares/validar-campos");
const validar_jwt_1 = require("../../middlewares/validar-jwt");
const usuarios_controller_1 = require("./usuarios.controller");
const router = express_1.Router();
router.get('/', [validar_jwt_1.validarJWT], usuarios_controller_1.getUsuarios);
router.get('/:id', [validar_jwt_1.validarJWT], usuarios_controller_1.getUsuario);
router.post('/', [validar_jwt_1.validarJWT,
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('user', 'El usuario es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El email es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'El password es obligatorio').not().isEmpty(),
    express_validator_1.check('role', 'El role es obligatorio').isMongoId(),
    express_validator_1.check('clinica', 'La clinica es obligatoria').isMongoId(),
    validar_campos_1.validarCampos], usuarios_controller_1.nuevoUsuario);
router.put('/:id', [validar_jwt_1.validarJWT], usuarios_controller_1.actualizarUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map