const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {

//region Seed de Usuarios
    // List of possible names
    const nombres = ["Marco", "Sofía", "Giusseppe", "María", "José", "Ana", "Carlos", "Luis"];
    const apellidos = ["Repetto", "Ramírez", "Queirolo", "González", "Pérez", "García", "Rodríguez", "Fernández"];
    const clave = "123";

    for (let i = 0; i < 7; i++) {
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        const direccion_correo = `${nombre.toLowerCase()}.${apellido.toLowerCase()}@usm.cl`;

        await prisma.usuario.create({
            data: {
                direccion_correo: direccion_correo,
                descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                nombre: nombre + " " + apellido,
                clave: clave,
                estado: 200
            }
        });

        console.log(`Created user ${nombre} ${apellido}`);
    }

    await prisma.usuario.create({
        data: {
            direccion_correo: "marco.repetto@usm.cl",
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            nombre: "Marco Repetto",
            clave: clave,
            estado: 200
        }
    });

    await prisma.usuario.create({
        data: {
            direccion_correo: "sofia.ramirez@usm.cl",
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            nombre: "Sofia Ramirez",
            clave: clave,
            estado: 200
        }
    });

    await prisma.usuario.create({
        data: {
            direccion_correo: "giuseppe.queirolo@usm.cl",
            descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            nombre: "Giuseppe Queirolo",
            clave: clave,
            estado: 200
        }
    });
//endregion

//region Seed de Correos

    const asuntos = ["Reunión", "Tarea", "Proyecto", "Trabajo", "Estudio", "Deportes", "Salud", "Familia"];
    const cuerpo = "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    const direcciones_correo = await prisma.usuario.findMany({
        select: {
            direccion_correo: true
        }
    });

    for (let i = 0; i < direcciones_correo.length; i++) {
        const direccion_correo_remitente = direcciones_correo[i].direccion_correo;

        for (let j = 0; j < 3; j++) {
            const asunto = asuntos[Math.floor(Math.random() * asuntos.length)];
            let index = Math.floor(Math.random() * direcciones_correo.length);
            if (index === i) {
                index > 0 ? index-- : index++;
            }

            const direccion_correo_destinatario = direcciones_correo[index].direccion_correo;

            await prisma.correo.create({
                data: {
                    asunto: asunto,
                    cuerpo: cuerpo,
                    direccion_correo_destinatario: direccion_correo_destinatario,
                    direccion_correo_remitente: direccion_correo_remitente,
                }
            })
                .then(() => {
                    console.log(`Se ha creado correo desde ${direccion_correo_remitente} hasta ${direccion_correo_destinatario}`);
                });
        }
    }
//endregion

    // Finish
    console.log("Finished seeding");
}

main()
    .then(() => {
        console.log("Seed complete");
        prisma.$disconnect();
    }).catch((e) => {
        console.error(e);
        prisma.$disconnect();
    });