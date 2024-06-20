import db from '../db';

function esusuario(direccion_correo: string, clave: string){
    return db.usuario.findUnique({
        where: {
            direccion_correo: direccion_correo,
            clave: clave
        }
    });
}

export async function registrar(body: { nombre: string, direccion_correo: string, clave: string, descripcion: string }) {

    const {nombre, direccion_correo, clave, descripcion} = body;

    const correo_existe = await db.usuario.findUnique({where: {direccion_correo:direccion_correo}});
    if (correo_existe){
        console.log("El correo que estás ingresando ya se encuentra registrado");
        return {
            "estado":400,
            "mensaje": "El correo que estás ingresando ya se encuentra registrado"
        };
    }

    try {
        return db.usuario.create({
            data: {
                nombre: nombre,
                direccion_correo: direccion_correo,
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
        return {
            estado: 500,
            mensaje: 'Error al obtener información del usuario'
        };
    }
}

export async function marcarcorreo(body: { direccion_correo: string, clave: string, id_correo_fav: number }) {
    console.log('Proceso de marcar correo como favorito');
    try {
        // Creo que la verificacion de tipo la hace typescript por defecto, no es necesario este if
        /*if (typeof body.correosFavoritos !== 'number') {
            console.error('Debe registrar un número como favorito');
            return {
                estado: 400,
                mensaje: 'Datos de entrada inválidos'
            };
        }*/

        const verificar = esusuario(body.direccion_correo,body.clave);
        if (!verificar) {
            return {
                estado: 400,
                mensaje: 'Usuario no encontrado'
            };
        }



        return db.favorito.create({
            data: {
                correo_id: body.id_correo_fav,
                direccion_correo: body.direccion_correo
            }
        })
            .then(() => {
                return {
                    estado: 200,
                    mensaje: 'Correo marcado como favorito'
                }
            });
    } catch (error) {
        return{
            estado: 400,
            mensaje: '"Ha existido un error al marcar el correo como favorito'
        
        }
    }
}

export async function bloquear(body: {direccion_correo: string, clave: string, direccion_bloqueada:string}){
    console.log('Proceso de bloquear direccion de correo');
    try {
        const verificar_usuario = esusuario(body.direccion_correo,body.clave);
        if (!verificar_usuario) {
            return {
                estado: 400,
                mensaje: 'Usuario no encontrado'
            };
        }

        const verificar_bloqueo = await db.usuario.findUnique({
            where: {
                direccion_correo: body.direccion_bloqueada
            }
        });

        if (!verificar_bloqueo) {
            return {
                estado: 400,
                mensaje: 'Usuario a bloquear no encontrado'
            };
        }

        return db.usuario_bloqueado.create({
            data: {
                bloqueadorCorreo: body.direccion_correo,
                bloqueadoCorreo: body.direccion_bloqueada
            }
        })
            .then(() => {
                return {
                    estado: 200,
                    mensaje: 'Direccion bloqueada con éxito'
                }
            });
    }
    catch (error) {
        return{
            estado: 400,
            mensaje: '"Ha existido un error al bloquear la direccion de correo'
        
        }
    }
}

export async function desmarcarcorreo(body: { direccion_correo: string, clave: string, correosFavoritos: number }) {
    console.log('Proceso de desmarcar correo como favorito');
    try {
        if (typeof body.correosFavoritos !== 'number') {
            console.error('Debe registrar un número como favorito');
            return {
                estado: 400,
                mensaje: 'Datos de entrada inválidos'
            };
        }

        // Asegurarse de que esusuario sea una función asíncrona si se usa una base de datos
        const verificar = await esusuario(body.direccion_correo, body.clave);
        if (!verificar) {
            return {
                estado: 400,
                mensaje: 'Usuario no encontrado'
            };
        }

        const resultado = await db.favorito.delete({
            where: {
                correo_id_direccion_correo: {
                    correo_id: body.correosFavoritos,
                    direccion_correo: body.direccion_correo
                }
            }
        });

        return {
            estado: 200,
            mensaje: 'Correo desmarcado como favorito'
        };

    } catch (error) {
        console.error('Error al desmarcar correo como favorito', error);
        return {
            estado: 500,
            mensaje: 'Ha ocurrido un error al desmarcar el correo como favorito'
        };
    }
}
