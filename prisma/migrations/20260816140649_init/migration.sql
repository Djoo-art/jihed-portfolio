-- CreateEnum
CREATE TYPE "Category" AS ENUM ('mobile', 'web');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "images" TEXT[],
    "videoUrl" TEXT,
    "apkUrl" TEXT,
    "technologies" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_category_idx" ON "Project"("category");

-- CreateIndex
CREATE INDEX "Project_order_idx" ON "Project"("order");
