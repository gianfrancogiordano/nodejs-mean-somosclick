"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecursosRole = void 0;
const mongoose_1 = require("mongoose");
const RecursosRoleSchema = new mongoose_1.Schema({
    modulo: {
        type: String,
        require: true,
    },
    visualizar: {
        type: Boolean,
        require: true,
        unique: true
    },
    editar: {
        type: Boolean,
        require: true,
    },
    eliminar: {
        type: Boolean,
        require: true,
    },
    tipoRole: {
        require: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'TipoRole'
    }
});
exports.RecursosRole = mongoose_1.model('RecursosRole', RecursosRoleSchema);
//# sourceMappingURL=recursos_role.model.js.map