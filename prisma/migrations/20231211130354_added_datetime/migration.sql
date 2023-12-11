-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_messageResponses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "response" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "messageId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "messageResponses_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_messageResponses" ("id", "messageId", "published", "response", "user") SELECT "id", "messageId", "published", "response", "user" FROM "messageResponses";
DROP TABLE "messageResponses";
ALTER TABLE "new_messageResponses" RENAME TO "messageResponses";
CREATE TABLE "new_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "subject" TEXT,
    "user" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_messages" ("id", "message", "subject", "user") SELECT "id", "message", "subject", "user" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
