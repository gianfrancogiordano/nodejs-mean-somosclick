import { Request, Response } from 'express';
import { genSaltSync, hashSync } from 'bcryptjs';
import { error, success } from '../../routes/response';
import { Usuario } from '../../models/usuario.model';
import { generarJWT } from '../login/login.utils';
import { dataTablePaginado } from '../../helpers/dataTable';

export const getUsuarios = async( req: any, res: Response ) => {

    const clinica = req.uclinica;
    
    const filtro = req.query.filtro || '';
    const regex = new RegExp(filtro, 'i');

    const pagina    = Number(req.query.pagina) || 1;
    const porPagina = Number(req.query.porPagina) || 5;
    const desde = Number(req.query.desde) || 0;

    const sWhere = {
        clinica,
        nombre: regex,
    }
    
    // Ejecutamos las dos peticiones simultaneamente
    const [usuarios, conteo]: any = await Promise.all([

        Usuario.find( sWhere, 'nombre user email activo role clinica _id')
            .skip(desde)
            .limit(porPagina),

        Usuario.countDocuments( sWhere )

    ]);

    const data = dataTablePaginado( usuarios, conteo, pagina, porPagina );

    success(req, res, data);

};

export const getUsuario = async(req: Request, res: Response) => {

    const { id } = req.params;

    const usuarioBD = await Usuario.findById(id);

    // Eliminamos el password
    if( usuarioBD?.password != null ) {
        usuarioBD.password = '';
    }

    success(req, res, usuarioBD);

};

export const nuevoUsuario = async(req: Request, res: Response) => {

    const { user, password } = req.body;

    try {

        const existeUser = await Usuario.findOne({ user: user });

        if (existeUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = genSaltSync();
        usuario.password = hashSync(password, salt);

        // Guardamos el usuario
        await usuario.save();

        // Generamos el token
        const token = await generarJWT(usuario.id, usuario.role, usuario.clinica);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

export const actualizarUsuario = async (req: Request, res: Response) => {

    const uid = req.params.id;
    const campos = req.body;

    console.log(req.body);

    try {

        // Buscamos el usuario en la base de datos
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado en BD"
            });
        }

        if( campos.password ) {
            // Encriptar contraseña
            console.log('Actualizando password de usuario ...');
            const salt = genSaltSync();
            campos.password = hashSync( campos.password, salt );
        }

        // Actualizamos el usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        // Eliminamos el password
        if(usuarioActualizado?.password != null) {
            usuarioActualizado.password = '';
        }

        success(req, res, usuarioActualizado);

    } catch (err) {

        error(req, res, 'Error inesperado', 500, err);
    }

};

