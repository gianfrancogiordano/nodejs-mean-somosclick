"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRole = void 0;
const { Schema, model } = require('mongoose');
const TipoRoleSchema = Schema({
    descripcion: {
        type: String,
        require: true,
    },
    clinica: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Clinica'
    }
});
exports.TipoRole = model('TipoRole', TipoRoleSchema);
//# sourceMappingURL=tipo_role.js.map