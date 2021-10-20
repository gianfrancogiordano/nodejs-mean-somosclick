import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../../middlewares/validar-campos';
import { validarJWT } from '../../middlewares/validar-jwt';
import { getUsuario, getUsuarios, nuevoUsuario, actualizarUsuario } from './usuarios.controller';

const router = Router();

router.get('/', [validarJWT], getUsuarios );


router.get('/:id', [validarJWT], getUsuario );

router.post('/', [validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('user', 'El usuario es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('role', 'El role es obligatorio').isMongoId(),
  check('clinica', 'La clinica es obligatoria').isMongoId(),
  validarCampos], nuevoUsuario );

router.put('/:id', [validarJWT], actualizarUsuario );

export default router;
