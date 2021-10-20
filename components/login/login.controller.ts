import { Request, Response } from 'express';
import { compareSync } from 'bcryptjs';

import { generarJWT, getMenu } from './login.utils';

import { Usuario } from '../../models/usuario.model';

export const login = async(req: Request, res: Response) => {

  // Aqui validamos el login del sistema
  const { usuario, password } = req.body;

  try {

    // Verificamos el user
    const usuarioDB = await Usuario.findOne({ user: usuario })
                                            .populate('role')
                                            .populate('clinica');

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "email o contraseña incorrectos"
      });
    }

    // Verificamos la contraseña
    const validPassword = compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "email o contraseña incorrectos"
      });
    }

    if (!usuarioDB.activo) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario esta inactivo. Comunicate con el administrador"
      });
    }

    // Generar TOKEN
    const token = await generarJWT(usuarioDB._id, usuarioDB.role, usuarioDB.clinica);
    return res.json({
      ok: true,
      token: token,
      menu: getMenu(usuarioDB.role)
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      msg: "Error insperado",
      error
    });
  }

};

export const renewToken = async( req: any, res: Response ) => {

  const uid = req.uid;

  // Buscamos informacion del usuario 
  const usuarioBD: any = await Usuario.findById(uid)
                                  .populate('role')
                                  .populate('clinica');

  if (!usuarioBD) {
    return res.status(404).json({
      ok: false,
      msg: "Token no válido"
    });
  }

  // No enviamos password al front
  delete usuarioBD.password;

  // Generar TOKEN
  const token = await generarJWT(usuarioBD._id, usuarioBD.role, usuarioBD.clinica);

  res.json({
    ok: true,
    token,
    usuarioBD,
    menu: getMenu(usuarioBD.role)
  });

};
