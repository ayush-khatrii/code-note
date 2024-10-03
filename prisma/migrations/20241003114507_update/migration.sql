/*
  Warnings:

  - You are about to drop the column `content` on the `codenote` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `codenote` table. All the data in the column will be lost.
  - Added the required column `code` to the `codenote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `langauge` to the `codenote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codenote" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "langauge" TEXT NOT NULL;
