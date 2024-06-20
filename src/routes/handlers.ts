import db from '../db';

export async function registrar(options: { nombre: string, correo: string, clave: string, descripcion: string }) {
    console.log('Proceso de registro');
    const {nombre, correo, clave, descripcion} = options;
    const correo_existe = await db.usuario.findUnique({where: {direccion_correo:correo}});
    if (correo_existe){
        console.log("El correo que estás ingresando ya se encuentra registrado");
        return {
            "estado":500,
            "mensaje": "El correo que estás ingresando ya se encuentra registrado"
        };
    }

    try {
        return db.usuario.create({
            data: {
                nombre: nombre,
                direccion_correo: correo,
                clave: clave,
                descripcion: descripcion,
                estado: 200
            }
        })
            .then(() => {
                return {
                    estado: 200,
                    mensaje: 'Usuario registrado'
                };
            });
    } catch (error) {
        console.error(error);
        return {
            estado: 500,
            mensaje: 'Error al registrar usuario'
        };
    }
}

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

export async function marcarcorreo(body: { direccion_correo: string, clave: string, correosFavoritos: number }) {
    try {
        const usuario = await db.usuario.findUnique({
            where: {
                direccion_correo: body.direccion_correo,
                clave: body.clave
            }
        });

        if (!usuario) {
            return {
                estado: 404,
                mensaje: 'Usuario no encontrado'
            };
        }
        const usuario_id = usuario.usuario_id;
        return db.favorito.create({
            data: {
                correo_id: body.correosFavoritos,
                usuario_id: usuario_id,
            }
        })
            .then(() => {
                return {
                    estado: 200,
                    mensaje: 'Correo marcado como favorito'
                }
            });
    } catch (error) {
        console.error(error);
        return null;
    }
}