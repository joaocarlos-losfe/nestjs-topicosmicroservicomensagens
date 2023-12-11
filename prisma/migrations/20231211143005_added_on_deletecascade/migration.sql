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
    CONSTRAINT "messageResponses_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_messageResponses" ("createdAt", "id", "messageId", "published", "response", "updatedAt", "user") SELECT "createdAt", "id", "messageId", "published", "response", "updatedAt", "user" FROM "messageResponses";
DROP TABLE "messageResponses";
ALTER TABLE "new_messageResponses" RENAME TO "messageResponses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
