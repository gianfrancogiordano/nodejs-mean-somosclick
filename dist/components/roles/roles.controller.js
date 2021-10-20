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
exports.actualizarRole = exports.nuevoRole = exports.getRole = exports.getRoles = void 0;
const response_1 = require("../../routes/response");
const role_model_1 = require("../../models/role.model");
const dataTable_1 = require("../../helpers/dataTable");
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clinica = req.uclinica;
    const filtro = req.query.filtro || '';
    const regex = new RegExp(filtro, 'i');
    const pagina = Number(req.query.pagina) || 1;
    const porPagina = Number(req.query.porPagina) || 5;
    const desde = Number(req.query.desde) || 0;
    const sWhere = {
        clinica,
        descripcion: regex,
    };
    const [roles, conteo] = yield Promise.all([
        role_model_1.Role.find(sWhere)
            .skip(desde)
            .limit(porPagina),
        role_model_1.Role.countDocuments(sWhere)
    ]);
    const data = dataTable_1.dataTablePaginado(roles, conteo, pagina, porPagina);
    response_1.success(req, res, data);
});
exports.getRoles = getRoles;
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const role = yield role_model_1.Role.findById(id);
        response_1.success(req, res, role);
    }
    catch (err) {
        response_1.error(req, res, 'Error Inesperado al traer el role', 500, err);
    }
});
exports.getRole = getRole;
const nuevoRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { descripcion, clinica } = req.body;
        //Buscamos que no exista una descripcion igual en la misma clinica
        const existeDescripcion = yield role_model_1.Role.findOne({ descripcion: descripcion, clinica: clinica });
        if (existeDescripcion) {
            return response_1.error(req, res, 'Ya existe un role con esa descripcion', 400, existeDescripcion);
        }
        // Creamos el role
        const role = new role_model_1.Role(req.body);
        // Guardamos en BD
        yield role.save();
        response_1.success(req, res, role);
    }
    catch (err) {
        response_1.error(req, res, 'Error Inesperado', 500, err);
    }
});
exports.nuevoRole = nuevoRole;
const actualizarRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const urole = req.params.id;
    const campos = req.body;
    // Buscamos el role en la base de datos
    const usuarioDB = yield role_model_1.Role.findById(urole);
    if (!usuarioDB) {
        return response_1.error(req, res, 'Role no encontrado en BD', 404, 'Role no encontrado en BD');
    }
    const roleActualizado = yield role_model_1.Role.findByIdAndUpdate(urole, campos, { new: true });
    response_1.success(req, res, roleActualizado);
});
exports.actualizarRole = actualizarRole;
//# sourceMappingURL=roles.controller.js.map