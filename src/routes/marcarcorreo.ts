import { PrismaClient } from '@prisma/client';

export default async function marcarcorreo(prisma: PrismaClient, body: object) {
    console.log('Proceso de marcado de correo');
    const {correo, correo_marcar} = body;
    const correo_existe = await prisma.usuario.findUnique({where: {direccion_correo:correo}});
    if (!correo_existe){
        console.log("El correo que estás ingresando no se encuentra registrado");
        return {
            "estado":500,
            "mensaje": "El correo que estás ingresando no se encuentra registrado"
        };
    }
    const correo_marcar_existe = await prisma.usuario.findUnique({where: {direccion_correo:correo_marcar}});
    if (!correo_marcar_existe){
        console.log("El correo que estás ingresando no se encuentra registrado");
        return {
            "estado":500,
            "mensaje": "El correo que estás ingresando no se encuentra registrado"
        };
    }
    try{
        const marcado = await prisma.correo.create({
            data: {
                direccion_correo: correo,
                direccion_correo_marcar: correo_marcar
            }
        })
        console.log("Correo", marcado, "marcado");
        return {
            estado: 200,
            mensaje: "Correo marcado con éxito"
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