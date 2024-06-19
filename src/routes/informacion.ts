import Elysia from "elysia";
import { PrismaClient } from "@prisma/client";
import app from "../api_rutas";

const api = new Elysia();
const  prisma = new PrismaClient();

app.post('/api/informacion', async (req: { body: { correo: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { estado: number; mensaje?: string; nombre?: string; correo?: string; descripcion?: string; }): void; new(): any; }; }; }) => {
    try {
        const { correo } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: {
                direccion_correo: correo
            }
        });

        if (!usuario) {
            res.status(400).json({ estado: 400, mensaje: "El usuario no existe" });
            return;
        }

        res.status(200).json({
            estado: usuario.estado,
            nombre: usuario.nombre,
            correo: usuario.direccion_correo,
            descripcion: usuario.descripcion
        });
        return;
} catch (error) {
        res.status(400).json({ estado: 400, mensaje: "Ha existido un error al realizar la petición" });
    }
});

export default app;
