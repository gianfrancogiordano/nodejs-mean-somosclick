"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../../middlewares/validar-campos");
const validar_jwt_1 = require("../../middlewares/validar-jwt");
const roles_controller_1 = require("./roles.controller");
const router = express_1.Router();
router.get('/', [validar_jwt_1.validarJWT], roles_controller_1.getRoles);
router.get('/:id', [validar_jwt_1.validarJWT], roles_controller_1.getRole);
router.post('/', [validar_jwt_1.validarJWT,
    express_validator_1.check('descripcion', 'El nombre del role es obligatorio').not().isEmpty(),
    express_validator_1.check('modulos', 'Los modulos son obligatorios').not().isEmpty(),
    express_validator_1.check('clinica', 'La clinica es obligatoria').isMongoId(),
    validar_campos_1.validarCampos], roles_controller_1.nuevoRole);
router.put('/:id', [validar_jwt_1.validarJWT], roles_controller_1.actualizarRole);
exports.default = router;
//# sourceMappingURL=roles.routes.js.map