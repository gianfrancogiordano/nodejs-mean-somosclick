import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../../middlewares/validar-campos';
import { validarJWT } from '../../middlewares/validar-jwt';
import { login, renewToken } from './login.controller';

const router = Router();

router.get('/renew', [validarJWT], renewToken);

router.post('/',[
                check('usuario', 'El usuario es requerido').notEmpty(),
                check('password', 'El password es requerido').notEmpty(),
                validarCampos ], login );

export default router;
