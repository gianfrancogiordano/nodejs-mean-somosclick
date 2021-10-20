"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../../middlewares/validar-campos");
const clinica_controller_1 = require("./clinica.controller");
const router = express_1.Router();
router.get('/', [], clinica_controller_1.getClinicas);
router.get('/:id', [], clinica_controller_1.getClinica);
router.post('/', [
    express_validator_1.check('razon_social', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('documento', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('representante', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('direccion', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('telefono', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El nombre es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos
], clinica_controller_1.nuevaClinica);
router.put('/:id', [], clinica_controller_1.actualizarClinica);
exports.default = router;
//# sourceMappingURL=clinica.routes.js.map