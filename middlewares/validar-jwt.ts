import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = ( req: any, res: Response, next: NextFunction ) => {

  // Leer el token de los headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "El token es necesario"
    });
  }

  try {

    const { uid, role, clinica }: any = jwt.verify(token, process.env.JWT_SECRET || '');

    req.uid = uid;
    req.urole = role;
    req.uclinica = clinica;
    
    next();

  } catch (error) {

    return res.status(401).json({
      ok: false,
      msg: "El token no es valido"
    });

  }
};
