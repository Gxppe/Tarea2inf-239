const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // List of possible names
    const nombres = ["Marco", "Sofía", "Giusseppe", "María", "José", "Ana", "Carlos", "Luis"];
    const apellidos = ["Repetto", "Ramírez", "Queirolo", "González", "Pérez", "García", "Rodríguez", "Fernández"];
    const clave = "123";

    for (let i = 0; i < 15; i++) {
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