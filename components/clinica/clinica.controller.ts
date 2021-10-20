import { Request, Response } from 'express';
import { Clinica } from '../../models/clinica.model';
import { success, error } from '../../routes/response';


export const getClinicas = async (req: Request, res: Response) => {

  const [ clinicas, total ] = await Promise.all([

        Clinica.find(),
        Clinica.countDocuments()

  ]);

  success(req, res, { clinicas, total });
};

export const getClinica = async (req: Request, res: Response) => {
  
  const id = req.params.id;

  try {

    const clinica = await Clinica.findById( id )
    success(req, res, clinica);

  } catch (err) {

    error(req, res, 'Error Inesperado al traer la clinica', 500, err);
  }

};

export const nuevaClinica = async (req: Request, res: Response) => {

  const { documento } = req.body;

  try {

    const existeDoc = await Clinica.findOne({ documento: documento });

    if (existeDoc) {

      return error(req, res, 'El documento ya está registrado', 400, '');
    }

    const clinica = new Clinica(req.body);

    // Guardamos la clinica
    await clinica.save();

    success(req, res, clinica);

  } catch (err) {

    error(req, res, 'Error Inesperado', 500, err);
  }

};

export const actualizarClinica = async (req: Request, res: Response) => {

  const uid = req.params.id;
  const campos = req.body;

  try {

    // Buscamos la clinica en la BD
    const clinicaDB = await Clinica.findById(uid);
    if (!clinicaDB) {

      return error(req, res, 'Clinica no encontrada en BD', 400, 'Clinica no encontrada en BD');
    }

    // Actualizamos la clinica
    const clinicaActualizada = await Clinica.findByIdAndUpdate(uid, campos, { new: true });

    success(req, res, clinicaActualizada);

  } catch (err) {

    error(req, res, 'Ocurrio un error inesperado', 500, err);
  }

};
