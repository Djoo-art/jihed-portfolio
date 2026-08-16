-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL DEFAULT 'profile',
    "name" TEXT NOT NULL DEFAULT 'Jihed Ghozzi',
    "title" TEXT NOT NULL DEFAULT 'Aspiring Full-Stack & Mobile Developer',
    "bio" TEXT NOT NULL DEFAULT 'I''m learning React and Next.js from zero.',
    "email" TEXT NOT NULL DEFAULT 'your.email@gmail.com',
    "avatarUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
