import { Request, Response } from "express";

export const success = (req: Request, res: Response, msn: any) => {

    res.json({
        ok: true,
        body: msn
    });

};

export const error = (req: Request, res: Response, msn: string, status: number, consola: any ) => {

    // Solo se muesta en el servidor: Con esto sabemos que es lo que pasa con las peticiones. Deberiamos de guardarlas ...
    console.log(`[ERROR-RESPONSE]:`, consola );

    res.status(status).json({
        ok: false,
        body: msn
    });

};

