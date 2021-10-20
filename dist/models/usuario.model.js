"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: true,
    },
    user: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    activo: {
        type: Number,
        default: 1,
    },
    role: {
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Role'
    },
    clinica: {
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Clinica'
    },
    avatar: {
        type: String,
    }
});
exports.Usuario = mongoose_1.model('Usuario', UsuarioSchema);
//# sourceMappingURL=usuario.model.js.map