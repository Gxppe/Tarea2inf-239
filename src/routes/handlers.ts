import db from '../db';

export async function getInformacion(email: string) {
    try {
        return db.usuario.findUnique({
            where: {
                direccion_correo: email
            }
        })
            .then((usuario) => {
                if (!usuario) {
                    return {
                        estado: 404,
                        mensaje: 'Usuario no encontrado'
                    }
                }

                return {
                    estado: 200,
                    nombre: usuario.nombre,
                    correo: usuario.direccion_correo,
                    direccion: usuario.descripcion
                };
            });
    } catch (error) {
        console.error(error);
        return null;
    }
}