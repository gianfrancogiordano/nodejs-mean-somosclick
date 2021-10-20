"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursosRole = void 0;
const { Schema, model } = require('mongoose');
const RecursosRoleSchema = Schema({
    modulo: {
        type: String,
        require: true,
    },
    visualizar: {
        type: String,
        require: true,
        unique: true
    },
    editar: {
        type: String,
        require: true,
    },
    eliminar: {
        type: String,
        require: true,
    },
    tipoRole: {
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
exports.RecursosRole = model('RecursosRole', RecursosRoleSchema);
//# sourceMappingURL=recursos_role.js.map