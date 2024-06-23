/*
  Warnings:

  - You are about to drop the column `Cuerpo` on the `Correo` table. All the data in the column will be lost.
  - Added the required column `cuerpo` to the `Correo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Correo_correo_id_key";

-- AlterTable
CREATE SEQUENCE correo_correo_id_seq;
ALTER TABLE "Correo" DROP COLUMN "Cuerpo",
ADD COLUMN     "cuerpo" TEXT NOT NULL,
ALTER COLUMN "correo_id" SET DEFAULT nextval('correo_correo_id_seq');
ALTER SEQUENCE correo_correo_id_seq OWNED BY "Correo"."correo_id";
