/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `Ingresso` table. All the data in the column will be lost.
  - You are about to drop the column `pedidoId` on the `LancheCombo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingresso" DROP CONSTRAINT "Ingresso_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "LancheCombo" DROP CONSTRAINT "LancheCombo_pedidoId_fkey";

-- AlterTable
ALTER TABLE "Ingresso" DROP COLUMN "pedidoId";

-- AlterTable
ALTER TABLE "LancheCombo" DROP COLUMN "pedidoId";

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "ingressosInfo" JSONB,
ADD COLUMN     "lanchesInfo" JSONB;
