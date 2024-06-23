/*
  Warnings:

  - The primary key for the `Correo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Favorito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `esFavorito` on the `Favorito` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `Favorito` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usuario_id` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Direccion_bloqueada` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `correo_id` on the `Correo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `direccion_correo` to the `Favorito` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `correo_id` on the `Favorito` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Correo" DROP CONSTRAINT "Correo_destinatario_fkey";

-- DropForeignKey
ALTER TABLE "Correo" DROP CONSTRAINT "Correo_remitente_fkey";

-- DropForeignKey
ALTER TABLE "Direccion_bloqueada" DROP CONSTRAINT "Direccion_bloqueada_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorito" DROP CONSTRAINT "Favorito_correo_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorito" DROP CONSTRAINT "Favorito_usuario_id_fkey";

-- DropIndex
DROP INDEX "Usuario_direccion_correo_key";

-- AlterTable
ALTER TABLE "Correo" DROP CONSTRAINT "Correo_pkey",
DROP COLUMN "correo_id",
ADD COLUMN     "correo_id" INTEGER NOT NULL,
ALTER COLUMN "remitente" SET DATA TYPE TEXT,
ALTER COLUMN "destinatario" SET DATA TYPE TEXT,
ADD CONSTRAINT "Correo_pkey" PRIMARY KEY ("correo_id");

-- AlterTable
ALTER TABLE "Favorito" DROP CONSTRAINT "Favorito_pkey",
DROP COLUMN "esFavorito",
DROP COLUMN "usuario_id",
ADD COLUMN     "direccion_correo" TEXT NOT NULL,
DROP COLUMN "correo_id",
ADD COLUMN     "correo_id" INTEGER NOT NULL,
ADD CONSTRAINT "Favorito_pkey" PRIMARY KEY ("correo_id", "direccion_correo");

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "usuario_id",
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("direccion_correo");

-- DropTable
DROP TABLE "Direccion_bloqueada";

-- CreateTable
CREATE TABLE "Usuario_bloqueado" (
    "bloqueadorCorreo" TEXT NOT NULL,
    "bloqueadoCorreo" TEXT NOT NULL,

    CONSTRAINT "Usuario_bloqueado_pkey" PRIMARY KEY ("bloqueadorCorreo","bloqueadoCorreo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Correo_correo_id_key" ON "Correo"("correo_id");

-- AddForeignKey
ALTER TABLE "Usuario_bloqueado" ADD CONSTRAINT "Usuario_bloqueado_bloqueadorCorreo_fkey" FOREIGN KEY ("bloqueadorCorreo") REFERENCES "Usuario"("direccion_correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_bloqueado" ADD CONSTRAINT "Usuario_bloqueado_bloqueadoCorreo_fkey" FOREIGN KEY ("bloqueadoCorreo") REFERENCES "Usuario"("direccion_correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_remitente_fkey" FOREIGN KEY ("remitente") REFERENCES "Usuario"("direccion_correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correo" ADD CONSTRAINT "Correo_destinatario_fkey" FOREIGN KEY ("destinatario") REFERENCES "Usuario"("direccion_correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_correo_id_fkey" FOREIGN KEY ("correo_id") REFERENCES "Correo"("correo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorito" ADD CONSTRAINT "Favorito_direccion_correo_fkey" FOREIGN KEY ("direccion_correo") REFERENCES "Usuario"("direccion_correo") ON DELETE RESTRICT ON UPDATE CASCADE;
