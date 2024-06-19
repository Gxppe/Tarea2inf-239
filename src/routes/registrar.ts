import { PrismaClient } from '@prisma/client';


export default async function registrar(prisma: PrismaClient, body: object) {
    console.log('Proceso de registro');
    const {nombre, direccion_correo, clave, descripcion} = body;
    const correo_existe = await prisma.usuario.findUnique({where: {direccion_correo:direccion_correo}});
    if (correo_existe){
        console.log("El correo que estás ingresando ya se encuentra registrado");
        return {
            "estado":500,
            "mensaje": "El correo que estás ingresando ya se encuentra registrado"
        };
    }
    try{
        const usuarionuevo = await prisma.usuario.create({
            data: {
                nombre: nombre,
                direccion_correo: direccion_correo,
                clave: clave,
                descripcion: descripcion,
                estado: 200
            }
        })
        console.log("Usuario", usuarionuevo, "registrado");
        return {
            estado: 200,
            mensaje: "Usuario registrado con éxito"
        };
    }
    catch (error){
        console.log("Error");
        return {
            estado: 400,
            mensaje: "Ha ocurrido un error"
        }
    }
    
}
