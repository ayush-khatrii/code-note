/*
  Warnings:

  - You are about to drop the column `langauge` on the `codenote` table. All the data in the column will be lost.
  - Added the required column `language` to the `codenote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codenote" DROP COLUMN "langauge",
ADD COLUMN     "language" TEXT NOT NULL;
