"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clinica = void 0;
const mongoose_1 = require("mongoose");
const ClinicaSchema = new mongoose_1.Schema({
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
    activo: {
        type: Number,
        default: 1
    },
    email: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    }
});
exports.Clinica = mongoose_1.model('Clinica', ClinicaSchema);
//# sourceMappingURL=clinica.model.js.map