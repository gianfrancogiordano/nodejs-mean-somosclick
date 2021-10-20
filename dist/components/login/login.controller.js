"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const login_utils_1 = require("./login.utils");
const usuario_model_1 = require("../../models/usuario.model");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Aqui validamos el login del sistema
    const { usuario, password } = req.body;
    try {
        // Verificamos el user
        const usuarioDB = yield usuario_model_1.Usuario.findOne({ user: usuario })
            .populate('role')
            .populate('clinica');
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "email o contraseña incorrectos"
            });
        }
        // Verificamos la contraseña
        const validPassword = bcryptjs_1.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "email o contraseña incorrectos"
            });
        }
        if (!usuarioDB.activo) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario esta inactivo. Comunicate con el administrador"
            });
        }
        // Generar TOKEN
        const token = yield login_utils_1.generarJWT(usuarioDB._id, usuarioDB.role, usuarioDB.clinica);
        return res.json({
            ok: true,
            token: token,
            menu: login_utils_1.getMenu(usuarioDB.role)
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error insperado",
            error
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    // Buscamos informacion del usuario 
    const usuarioBD = yield usuario_model_1.Usuario.findById(uid)
        .populate('role')
        .populate('clinica');
    if (!usuarioBD) {
        return res.status(404).json({
            ok: false,
            msg: "Token no válido"
        });
    }
    // No enviamos password al front
    delete usuarioBD.password;
    // Generar TOKEN
    const token = yield login_utils_1.generarJWT(usuarioBD._id, usuarioBD.role, usuarioBD.clinica);
    res.json({
        ok: true,
        token,
        usuarioBD,
        menu: login_utils_1.getMenu(usuarioBD.role)
    });
});
exports.renewToken = renewToken;
//# sourceMappingURL=login.controller.js.map