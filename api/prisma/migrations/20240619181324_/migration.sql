-- CreateTable
CREATE TABLE "Usuario" (
    "usuario_id" SERIAL NOT NULL,
    "direccion_correo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "estado" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "Direccion_bloqueada" (
    "direccion_bloqueada" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Direccion_bloqueada_pkey" PRIMARY KEY ("direccion_bloqueada")
);

-- CreateTable
CREATE TABLE "Correo" (
    "correo_id" TEXT NOT NULL,
    "remitente" INTEGER NOT NULL,
    "destinatario" INTEGER NOT NULL,
    "asunto" TEXT NOT NULL,
    "Cuerpo" TEXT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leido" BOOLEAN NOT NULL,

    CONSTRAINT "Correo_pkey" PRIMARY KEY ("correo_id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "correo_id" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "esFavorito" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("correo_id","usuario_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_direccion_correo_key" ON "Usuario"("direccion_correo");

-- CreateIndex
CREATE UNIQUE INDEX "Correo_correo_id_key" ON "Correo"("correo_id");

-- AddForeignKey
ALTER TABLE "Direccion_bloqueada" ADD CONSTRAINT "Direccion_bloqueada_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_remitente_fkey" FOREIGN KEY ("remitente") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_destinatario_fkey" FOREIGN KEY ("destinatario") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_correo_id_fkey" FOREIGN KEY ("correo_id") REFERENCES "Correo"("correo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;
