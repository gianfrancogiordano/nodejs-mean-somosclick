import { Request, Response } from 'express';
import { error, success } from '../../routes/response';

import { Role } from '../../models/role.model';
import { dataTablePaginado } from '../../helpers/dataTable';


export const getRoles = async (req: any, res: Response) => {

  const clinica = req.uclinica;
  const filtro = req.query.filtro || '';
  const regex = new RegExp(filtro, 'i');
  const pagina = Number(req.query.pagina) || 1;
  const porPagina = Number(req.query.porPagina) || 5;
  const desde = Number(req.query.desde) || 0;

  const sWhere = {
    clinica,
    descripcion: regex,
  }

  const [roles, conteo] = await Promise.all([

    Role.find(sWhere)
        .skip(desde)
        .limit(porPagina),

      Role.countDocuments(sWhere)

  ]);

  const data = dataTablePaginado(roles, conteo, pagina, porPagina);

  success(req, res, data);

};

export const getRole = async (req: Request, res: Response) => {

  const id = req.params.id;

  try {

    const role = await Role.findById(id)
    success(req, res, role);

  } catch (err) {
    error(req, res, 'Error Inesperado al traer el role', 500, err);
  }

};

export const nuevoRole = async (req: Request, res: Response) => {

  try {

    const { descripcion, clinica } = req.body;

    //Buscamos que no exista una descripcion igual en la misma clinica
    const existeDescripcion = await Role.findOne({ descripcion: descripcion, clinica: clinica });

    if (existeDescripcion) {
      return error(req, res, 'Ya existe un role con esa descripcion', 400, existeDescripcion);
    }

    // Creamos el role
    const role = new Role(req.body);

    // Guardamos en BD
    await role.save();

    success(req, res, role);

  } catch (err) {

    error(req, res, 'Error Inesperado', 500, err);
  }

};

export const actualizarRole = async (req: Request, res: Response) => {


  const urole = req.params.id;
  const campos = req.body;

  // Buscamos el role en la base de datos
  const usuarioDB = await Role.findById(urole);
  if (!usuarioDB) {
    return error(req, res, 'Role no encontrado en BD', 404, 'Role no encontrado en BD');
  }

  const roleActualizado = await Role.findByIdAndUpdate(urole, campos, { new: true });
  success(req, res, roleActualizado);

};
