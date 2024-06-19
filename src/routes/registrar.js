import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = new Elysia();

app.post('/api/registrar', async (req, res) => {
  try {
    const { nombre, correo, clave, descripcion } = req.body;
    const user = await prisma.usuario.create({
      data: {
        nombre,
        direccion_correo: correo,
        clave,
        descripcion,
        estado: 200 // Suponiendo que el estado '1' representa un usuario activo
      }
    });

    res.json({ estado: 200, mensaje: "Se realizó la petición correctamente" });
  } catch (error) {
    res.status(400).json({ estado: 400, mensaje: "Ha existido un error al realizar la petición" });
  }
});

export default app;
