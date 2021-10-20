"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarUsuario = exports.nuevoUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = require("bcryptjs");
const response_1 = require("../../routes/response");
const usuario_model_1 = require("../../models/usuario.model");
const login_utils_1 = require("../login/login.utils");
const dataTable_1 = require("../../helpers/dataTable");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clinica = req.uclinica;
    const filtro = req.query.filtro || '';
    const regex = new RegExp(filtro, 'i');
    const pagina = Number(req.query.pagina) || 1;
    const porPagina = Number(req.query.porPagina) || 5;
    const desde = Number(req.query.desde) || 0;
    const sWhere = {
        clinica,
        nombre: regex,
    };
    // Ejecutamos las dos peticiones simultaneamente
    const [usuarios, conteo] = yield Promise.all([
        usuario_model_1.Usuario.find(sWhere, 'nombre user email activo role clinica _id')
            .skip(desde)
            .limit(porPagina),
        usuario_model_1.Usuario.countDocuments(sWhere)
    ]);
    const data = dataTable_1.dataTablePaginado(usuarios, conteo, pagina, porPagina);
    response_1.success(req, res, data);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarioBD = yield usuario_model_1.Usuario.findById(id);
    // Eliminamos el password
    if ((usuarioBD === null || usuarioBD === void 0 ? void 0 : usuarioBD.password) != null) {
        usuarioBD.password = '';
    }
    response_1.success(req, res, usuarioBD);
});
exports.getUsuario = getUsuario;
const nuevoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    try {
        const existeUser = yield usuario_model_1.Usuario.findOne({ user: user });
        if (existeUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya esta registrado'
            });
        }
        const usuario = new usuario_model_1.Usuario(req.body);
        // Encriptar contraseña
        const salt = bcryptjs_1.genSaltSync();
        usuario.password = bcryptjs_1.hashSync(password, salt);
        // Guardamos el usuario
        yield usuario.save();
        // Generamos el token
        const token = yield login_utils_1.generarJWT(usuario.id, usuario.role, usuario.clinica);
        res.json({
            ok: true,
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
});
exports.nuevoUsuario = nuevoUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    const campos = req.body;
    console.log(req.body);
    try {
        // Buscamos el usuario en la base de datos
        const usuarioDB = yield usuario_model_1.Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado en BD"
            });
        }
        if (campos.password) {
            // Encriptar contraseña
            console.log('Actualizando password de usuario ...');
            const salt = bcryptjs_1.genSaltSync();
            campos.password = bcryptjs_1.hashSync(campos.password, salt);
        }
        // Actualizamos el usuario
        const usuarioActualizado = yield usuario_model_1.Usuario.findByIdAndUpdate(uid, campos, { new: true });
        // Eliminamos el password
        if ((usuarioActualizado === null || usuarioActualizado === void 0 ? void 0 : usuarioActualizado.password) != null) {
            usuarioActualizado.password = '';
        }
        response_1.success(req, res, usuarioActualizado);
    }
    catch (err) {
        response_1.error(req, res, 'Error inesperado', 500, err);
    }
});
exports.actualizarUsuario = actualizarUsuario;
//# sourceMappingURL=usuarios.controller.js.map