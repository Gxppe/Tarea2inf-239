import db from '../db';


// Función esusuario. Recibe la dirección de correo y la clave de un usuario y verifica si existe en la base de datos.
function esusuario(direccion_correo: string, clave: string){
    return db.usuario.findUnique({
        where: {
            direccion_correo: direccion_correo,
            clave: clave
        }
    });
}

export async function main_test() {
    return db.usuario.findMany();
}

// Función registrar. Recibe un objeto con los datos de un usuario. Verifica si el correo ya está registrado
//y si no, lo registra.
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
                    "estado": 200,
                    "mensaje": 'Usuario registrado'
                };
            });

    } catch (error) {
        console.error(error);
        return {
            "estado": 500,
            "mensaje": 'Error al registrar usuario'
        };
    }
}

// Función getInformacion. Recibe la dirección de correo de un usuario y devuelve su información.
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
                        estado: 400,
                        mensaje: 'Usuario no encontrado'
                    }
                }

                return {
                    estado: 200,
                    nombre: usuario.nombre,
                    correo: usuario.direccion_correo,
                    descripcion: usuario.descripcion
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

// Función marcarcorreo. Recibe la dirección de correo y la clave de un usuario, y el id de un correo el cual se quiere
// marcar como favorito. Verifica si el usuario existe, si el correo existe, si el correo ya está marcado como favorito
// y si el correo está asociado al usuario. Si todo está correcto, marca el correo como favorito.
export async function marcarcorreo(body: { direccion_correo: string, clave: string, id_correo_fav: number }) {
    console.log('Proceso de marcar correo como favorito');
    try {
        const verificar = await esusuario(body.direccion_correo, body.clave);
        if (!verificar) {
            return {
                estado: 400,
                mensaje: 'Usuario no encontrado'
            };
        }

        // Verificar si el correo a marcar como favorito existe
        const verificar_correo = await db.correo.findUnique({
            where: {
                correo_id: body.id_correo_fav
            }
        });

        if (!verificar_correo) {
            return {
                estado: 400,
                mensaje: 'Correo no encontrado'
            };
        }

        // Verificar si el correo ya está marcado como favorito
        const verificar_favorito = await db.favorito.findUnique({
            where: {
                correo_id_direccion_correo: {
                    correo_id: body.id_correo_fav,
                    direccion_correo: body.direccion_correo
                }
            }
        });

        if (verificar_favorito) {
            return {
                estado: 400,
                mensaje: 'Correo ya marcado como favorito'
            };
        }

        // Verificar pertenencia del correo al usuario
        const verificar_pertenencia = (await db.correo.findUnique({
            where: {
                correo_id: body.id_correo_fav,
                destinatario: body.direccion_correo
            }})) || (await db.correo.findUnique({
                where: {
                    correo_id: body.id_correo_fav,
                    remitente: body.direccion_correo
                }
            }));

        if (!verificar_pertenencia) {
            return {
                estado: 400,
                mensaje: 'Correo no pertenece al usuario'
            };
        }

        await db.favorito.create({
            data: {
                correo_id: body.id_correo_fav,
                direccion_correo: body.direccion_correo
            }
        });

        return {
            estado: 200,
            mensaje: 'Correo marcado como favorito'
        }
    } catch (error) {
        console.log(error)

        return{
            estado: 500,
            mensaje: '"Ha existido un error al marcar el correo como favorito'
        }
    }
}

// Función bloquear. Recibe la dirección de correo y la clave de un usuario, y la dirección de correo de otro usuario al
// cual se quiere bloquear. Verifica si el usuario existe, si el usuario a bloquear existe y si el usuario a bloquear no
// está ya bloqueado. Si todo está correcto, bloquea al usuario.
export async function bloquear(body: {direccion_correo: string, clave: string, direccion_bloqueada:string}){
    
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

        const verificar_bloqueo_existente = await db.usuario_bloqueado.findUnique({
            where: {
                bloqueadorCorreo_bloqueadoCorreo: {
                    bloqueadorCorreo: body.direccion_correo,
                    bloqueadoCorreo: body.direccion_bloqueada
                }
            }
        });

        if (verificar_bloqueo_existente) {
            return {
                estado: 400,
                mensaje: 'Usuario ya bloqueado'
            };
        }

        return db.usuario_bloqueado.create({
            data: {
                bloqueadorCorreo: body.direccion_correo,
                bloqueadoCorreo: body.direccion_bloqueada
            }
        })
            .then(() => {
                console.log('Proceso de bloquear direccion de correo');
                return {
                    estado: 200,
                    mensaje: 'Direccion bloqueada con éxito'
                }
            });
            
    }
    catch (error) {
        return{
            estado: 500,
            mensaje: '"Ha existido un error al bloquear la direccion de correo'
        
        }
    }
}

// Función desmarcarcorreo. Recibe la dirección de correo y la clave de un usuario, y el id de un correo que se quiere
// desmarcar como favorito. Verifica si el usuario existe, si el correo existe, si el correo está marcado como favorito
// y si el correo está asociado al usuario. Si todo está correcto, desmarca el correo como favorito.

export async function desmarcarcorreo(body: { direccion_correo: string, clave: string, id_correo_fav: number }) {
    console.log('Proceso de desmarcar correo como favorito');
    try {
        // Asegurarse de que esusuario sea una función asíncrona si se usa una base de datos
        const verificar = await esusuario(body.direccion_correo, body.clave);
        if (!verificar) {
            return {
                estado: 400,
                mensaje: 'Usuario no encontrado'
            };
        }

        // Verificar si el correo a desmarcar como favorito existe
        const verificar_correo = await db.correo.findUnique({
            where: {
                correo_id: body.id_correo_fav
            }
        });
        if (!verificar_correo) {
            return {
                estado: 400,
                mensaje: 'Correo no encontrado'
            };
        }

        // Verificar si el correo a desmarcar como favorito esta en la lista de favoritos
        const verificar_correo_fav = await db.favorito.findUnique({
            where: {
                correo_id_direccion_correo: {
                    correo_id: body.id_correo_fav,
                    direccion_correo: body.direccion_correo
                }
            }
        });
        if (!verificar_correo_fav) {
            return {
                estado: 400,
                mensaje: 'El usuario no tiene este correo marcado como favorito'
            };
        }

        // Eliminar el correo de la lista de favoritos
        await db.favorito.delete({
            where: {
                correo_id_direccion_correo: {
                    correo_id: body.id_correo_fav,
                    direccion_correo: body.direccion_correo
                }
            }
        });

        return {
            estado: 200,
            mensaje: 'Correo desmarcado como favorito'
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            estado: 500,
            mensaje: 'Ha ocurrido un error al desmarcar el correo como favorito'
        };
    }
}

// Función iniciarsesion. Recibe la dirección de correo de un usuario y devuelve su información.
export async function iniciarsesion(email: string) {
    try {
        return db.usuario.findUnique({
            where: {
                direccion_correo: email
            }
        })
            .then((usuario) => {
                if (!usuario) {
                    return {
                        estado: 400,
                        mensaje: 'El correo ingresado no se encuentra registrado'
                    }
                }

                return {
                    estado: 200,
                    nombre: usuario.nombre,
                    correo: usuario.direccion_correo,
                    clave: usuario.clave,
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

// Función ver_favoritos. Recibe la dirección de correo y la clave de un usuario y devuelve los correos
// marcados como favoritos.
export async function ver_favoritos(direccion_correo: string){
    try {
        return db.favorito.findMany({
            where: {
                direccion_correo: direccion_correo
            },
            select: {
                correo: true
            }
        })
            .then((correos) => {
                if (!correos) {
                    return {
                        estado: 400,
                        mensaje: 'No se encontraron correos marcados como favoritos'
                    }
                }

                return {
                    estado: 200,
                    correos: correos
                };
            });
    } catch (error) {
        console.error(error);
        return {
            estado: 500,
            mensaje: 'Error al obtener información de los correos marcados como favoritos'
        };
    }
}