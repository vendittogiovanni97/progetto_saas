/*
  Warnings:

  - You are about to drop the column `name` on the `Chatbot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Chatbot` will be added. If there are existing duplicate values, this will fail.
  - Made the column `projectId` on table `Chatbot` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Chatbot` DROP FOREIGN KEY `Chatbot_projectId_fkey`;

-- DropIndex
DROP INDEX `Chatbot_projectId_idx` ON `Chatbot`;

-- AlterTable
ALTER TABLE `Chatbot` DROP COLUMN `name`,
    MODIFY `projectId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `config` TEXT NULL,
    ADD COLUMN `type` ENUM('CHATBOT', 'FORM', 'WORKFLOW', 'API') NOT NULL DEFAULT 'CHATBOT';

-- CreateIndex
CREATE UNIQUE INDEX `Chatbot_projectId_key` ON `Chatbot`(`projectId`);

-- CreateIndex
CREATE INDEX `Project_type_idx` ON `Project`(`type`);

-- AddForeignKey
ALTER TABLE `Chatbot` ADD CONSTRAINT `Chatbot_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
