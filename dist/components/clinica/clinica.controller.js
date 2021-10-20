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
exports.actualizarClinica = exports.nuevaClinica = exports.getClinica = exports.getClinicas = void 0;
const clinica_model_1 = require("../../models/clinica.model");
const response_1 = require("../../routes/response");
const getClinicas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [clinicas, total] = yield Promise.all([
        clinica_model_1.Clinica.find(),
        clinica_model_1.Clinica.countDocuments()
    ]);
    response_1.success(req, res, { clinicas, total });
});
exports.getClinicas = getClinicas;
const getClinica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const clinica = yield clinica_model_1.Clinica.findById(id);
        response_1.success(req, res, clinica);
    }
    catch (err) {
        response_1.error(req, res, 'Error Inesperado al traer la clinica', 500, err);
    }
});
exports.getClinica = getClinica;
const nuevaClinica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { documento } = req.body;
    try {
        const existeDoc = yield clinica_model_1.Clinica.findOne({ documento: documento });
        if (existeDoc) {
            return response_1.error(req, res, 'El documento ya está registrado', 400, '');
        }
        const clinica = new clinica_model_1.Clinica(req.body);
        // Guardamos la clinica
        yield clinica.save();
        response_1.success(req, res, clinica);
    }
    catch (err) {
        response_1.error(req, res, 'Error Inesperado', 500, err);
    }
});
exports.nuevaClinica = nuevaClinica;
const actualizarClinica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.id;
    const campos = req.body;
    try {
        // Buscamos la clinica en la BD
        const clinicaDB = yield clinica_model_1.Clinica.findById(uid);
        if (!clinicaDB) {
            return response_1.error(req, res, 'Clinica no encontrada en BD', 400, 'Clinica no encontrada en BD');
        }
        // Actualizamos la clinica
        const clinicaActualizada = yield clinica_model_1.Clinica.findByIdAndUpdate(uid, campos, { new: true });
        response_1.success(req, res, clinicaActualizada);
    }
    catch (err) {
        response_1.error(req, res, 'Ocurrio un error inesperado', 500, err);
    }
});
exports.actualizarClinica = actualizarClinica;
//# sourceMappingURL=clinica.controller.js.map