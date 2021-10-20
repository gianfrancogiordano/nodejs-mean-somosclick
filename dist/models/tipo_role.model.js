"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    descripcion: {
        type: String,
        require: true,
    },
    modulos: [{
            modulo: String,
            visualizar: Boolean,
            editar: Boolean,
            eliminar: Boolean
        }],
    clinica: {
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Clinica'
    }
});
exports.Role = mongoose_1.model('TipoRole', RoleSchema);
//# sourceMappingURL=tipo_role.model.js.map