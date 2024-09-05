-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_permissionId_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "permissionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
