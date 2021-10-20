import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../../middlewares/validar-campos';
import { validarJWT } from '../../middlewares/validar-jwt';
import { getRoles, getRole, nuevoRole, actualizarRole } from './roles.controller';

const router = Router();

router.get('/', [validarJWT], getRoles);

router.get('/:id', [validarJWT], getRole);

router.post('/', [validarJWT,
  check('descripcion', 'El nombre del role es obligatorio').not().isEmpty(),
  check('modulos', 'Los modulos son obligatorios').not().isEmpty(),
  check('clinica', 'La clinica es obligatoria').isMongoId(),
  validarCampos], nuevoRole);

router.put('/:id', [validarJWT], actualizarRole);

export default router;
