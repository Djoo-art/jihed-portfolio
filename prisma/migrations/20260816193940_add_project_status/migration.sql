-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('completed', 'upcoming');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'completed';
