/*
  Warnings:

  - Added the required column `userId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTerms` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectDescription` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentTerms" TEXT NOT NULL,
ADD COLUMN     "projectDescription" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
