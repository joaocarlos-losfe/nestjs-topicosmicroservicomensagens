-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "subject" TEXT,
    "user" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "response" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "messageId" TEXT NOT NULL,
    CONSTRAINT "Response_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
