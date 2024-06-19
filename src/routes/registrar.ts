import { PrismaClient } from '@prisma/client';
import Request from 'elysia';
import Response from 'elysia';

export default function registrar(prisma: PrismaClient) {
    return async (req: Request, res: Response) => {
        const { nombre, correo, clave, descripcion } = req.body;
        try {
            await prisma.usuario.create({
                data: {
                    direccion_correo: correo,
                    nombre: nombre,
                    clave: clave,
                    descripcion: descripcion,
                    estado: 200
                }
            });
            res.status(200).json({ estado: 200, mensaje: "Se realizo la peticion correctamente" });
        } catch (error) {
            res.status(400).json({ estado: 400, mensaje: "Ha existido un error al realizar la peticion" });
        }
    };
}
