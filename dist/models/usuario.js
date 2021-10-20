"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true,
    },
    usuario: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'TipoRole'
    },
    clinica: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Clinica'
    }
});
exports.Usuario = model('Usuario', UsuarioSchema);
//# sourceMappingURL=usuario.js.map