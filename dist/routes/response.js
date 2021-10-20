"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = (req, res, msn) => {
    res.json({
        ok: true,
        body: msn
    });
};
exports.success = success;
const error = (req, res, msn, status, consola) => {
    // Solo se muesta en el servidor: Con esto sabemos que es lo que pasa con las peticiones. Deberiamos de guardarlas ...
    console.log(`[ERROR-RESPONSE]:`, consola);
    res.status(status).json({
        ok: false,
        body: msn
    });
};
exports.error = error;
//# sourceMappingURL=response.js.map