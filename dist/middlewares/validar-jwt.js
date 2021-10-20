"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    // Leer el token de los headers
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "El token es necesario"
        });
    }
    try {
        const { uid, role, clinica } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.uid = uid;
        req.urole = role;
        req.uclinica = clinica;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "El token no es valido"
        });
    }
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=validar-jwt.js.map