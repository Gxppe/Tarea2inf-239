import Elysia from "elysia";
import { PrismaClient } from "@prisma/client";
import app from "../api_rutas";

const api = new Elysia();
const  prisma = new PrismaClient();

app.post('/api/bloquear', async (req: { body: { correo: any; clave: any; correo_bloquear: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { estado: number; mensaje: string; }): void; new(): any; }; }; json: { (arg0: { estado: number; mensaje: string; }): void; new(): any; }; }) => {
    try {
        const { correo, clave, correo_bloquear } = req.body;

        const usuario_bloqueador = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo,
                clave: clave
            }
        });

        if (!usuario_bloqueador) {
            res.status(400).json({ estado: 400, mensaje: "El usuario no existe" });
            return;
        }

        const direccionBloqueadaClient = await prisma.direccion_bloqueada.create({
            data: {
                direccion_bloqueada: correo_bloquear,
                usuario_id: usuario_bloqueador.usuario_id
            }
        });

        res.json({ estado: 200, mensaje: "Se realizó la petición correctamente" });
    } catch (error) {
        res.status(400).json({ estado: 400, mensaje: "Ha existido un error al realizar la petición" });
    }
});

export default app;
