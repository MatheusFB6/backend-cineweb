/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `datasExibicao` on the `Filme` table. All the data in the column will be lost.
  - The `genero` column on the `Filme` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `tipo` on the `Ingresso` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Ingresso` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Pedido` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataHora` on the `Sessao` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Lanche` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PedidoLanche` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cinemaId` to the `Filme` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duracao` on the `Filme` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `valorInteira` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorMeia` to the `Ingresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinemaId` to the `Sala` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cinemaId` to the `Sessao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioExibicao` to the `Sessao` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('ACAO', 'AVENTURA', 'COMEDIA', 'DRAMA', 'TERROR', 'FICCAO', 'ROMANCE', 'ANIMACAO', 'DOCUMENTARIO', 'OUTRO');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ingresso" DROP CONSTRAINT "Ingresso_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_userId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoLanche" DROP CONSTRAINT "PedidoLanche_lancheId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoLanche" DROP CONSTRAINT "PedidoLanche_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profileId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Address_id_seq";

-- AlterTable
ALTER TABLE "Filme" DROP COLUMN "datasExibicao",
ADD COLUMN     "cinemaId" INTEGER NOT NULL,
ADD COLUMN     "dataFinalExibicao" TIMESTAMP(3),
ADD COLUMN     "dataInicioExibicao" TIMESTAMP(3),
ADD COLUMN     "elenco" TEXT,
DROP COLUMN "duracao",
ADD COLUMN     "duracao" TIMESTAMP(3) NOT NULL,
DROP COLUMN "genero",
ADD COLUMN     "genero" "Genero";

-- AlterTable
ALTER TABLE "Ingresso" DROP COLUMN "tipo",
DROP COLUMN "valor",
ADD COLUMN     "valorInteira" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "valorMeia" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "pedidoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Profile_id_seq";

-- AlterTable
ALTER TABLE "Sala" ADD COLUMN     "cinemaId" INTEGER NOT NULL,
ADD COLUMN     "poltronas" JSONB;

-- AlterTable
ALTER TABLE "Sessao" DROP COLUMN "dataHora",
ADD COLUMN     "cinemaId" INTEGER NOT NULL,
ADD COLUMN     "horarioExibicao" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "profileId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Lanche";

-- DropTable
DROP TABLE "PedidoLanche";

-- CreateTable
CREATE TABLE "Cinema" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Cinema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LancheCombo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valorUnitario" DOUBLE PRECISION NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "pedidoId" INTEGER,

    CONSTRAINT "LancheCombo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filme" ADD CONSTRAINT "Filme_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sala" ADD CONSTRAINT "Sala_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingresso" ADD CONSTRAINT "Ingresso_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LancheCombo" ADD CONSTRAINT "LancheCombo_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE SET NULL ON UPDATE CASCADE;
