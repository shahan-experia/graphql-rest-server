-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('SYSTEM', 'MANAGER') NOT NULL DEFAULT 'MANAGER',
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firebaseUID` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `fullName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `cell` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE', 'PREFER_NOT_TO_SAY') NULL,
    `signUpType` ENUM('LOCAL', 'FACEBOOK', 'GOOGLE') NOT NULL DEFAULT 'LOCAL',
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
