-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
