/*
  Warnings:

  - A unique constraint covering the columns `[invoiceId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "invoiceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_invoiceId_key" ON "Address"("invoiceId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
