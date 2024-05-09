/*
  Warnings:

  - You are about to drop the `Igredients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Igredients" DROP CONSTRAINT "Igredients_productId_fkey";

-- DropTable
DROP TABLE "Igredients";

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredients_productId_key" ON "Ingredients"("productId");

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
