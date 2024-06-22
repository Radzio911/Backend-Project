/*
  Warnings:

  - You are about to drop the column `profilePricture` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `profilePricture` on the `User` table. All the data in the column will be lost.
  - Added the required column `profilePicture` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Host` DROP COLUMN `profilePricture`,
    ADD COLUMN `profilePicture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `profilePricture`,
    ADD COLUMN `profilePicture` VARCHAR(191) NOT NULL;
