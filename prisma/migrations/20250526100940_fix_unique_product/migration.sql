/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `products_id_key` ON `products`(`id`);
