/*
  Warnings:

  - You are about to drop the column `systemPrompt` on the `Chatbot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Chatbot` DROP COLUMN `systemPrompt`,
    ADD COLUMN `encodedPrompt` TEXT NULL,
    ADD COLUMN `personality` ENUM('AMICHEVOLE', 'PROFESSIONALE', 'ESPERTO', 'DETTAGLIATO', 'TECNICO', 'DIVERTENTE') NOT NULL DEFAULT 'PROFESSIONALE',
    ADD COLUMN `template` ENUM('GENERIC', 'CUSTOM') NOT NULL DEFAULT 'GENERIC',
    ADD COLUMN `type` ENUM('DEFAULT', 'AI') NOT NULL DEFAULT 'DEFAULT';
