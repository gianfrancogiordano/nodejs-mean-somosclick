"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clinica = void 0;
const { Schema, model } = require('mongoose');
const ClinicaSchema = Schema({
    razon_social: {
        type: String,
        require: true,
    },
    documento: {
        type: String,
        require: true,
        unique: true
    },
    representante: {
        type: String,
        require: true,
    },
    direccion: {
        type: String,
        require: true,
    },
    telefono: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
});
exports.Clinica = model('Clinica', ClinicaSchema);
//# sourceMappingURL=clinica.js.map