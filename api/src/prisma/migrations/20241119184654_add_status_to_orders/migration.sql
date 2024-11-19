-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pendente', 'Preparando', 'Entregue');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus";
