import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../../middlewares/validar-campos';
import { getClinicas, getClinica, nuevaClinica, actualizarClinica } from './clinica.controller';

const router = Router();

router.get('/', [], getClinicas);

router.get('/:id', [], getClinica);

router.post('/', [
  check('razon_social', 'El nombre es obligatorio').not().isEmpty(),
  check('documento', 'El nombre es obligatorio').not().isEmpty(),
  check('representante', 'El nombre es obligatorio').not().isEmpty(),
  check('direccion', 'El nombre es obligatorio').not().isEmpty(),
  check('telefono', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos], nuevaClinica);

router.put('/:id', [], actualizarClinica);

export default router;
