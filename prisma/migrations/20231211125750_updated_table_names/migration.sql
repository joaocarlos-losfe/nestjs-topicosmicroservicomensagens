/*
  Warnings:

  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Message";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Response";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "subject" TEXT,
    "user" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "messageResponses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "response" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "messageId" TEXT NOT NULL,
    CONSTRAINT "messageResponses_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
