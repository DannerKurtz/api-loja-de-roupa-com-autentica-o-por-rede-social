-- AlterTable
ALTER TABLE "Permissions" ALTER COLUMN "productCreate" SET DEFAULT false,
ALTER COLUMN "productRead" SET DEFAULT false,
ALTER COLUMN "productUpdate" SET DEFAULT false,
ALTER COLUMN "productDelete" SET DEFAULT false,
ALTER COLUMN "userCreate" SET DEFAULT false,
ALTER COLUMN "userRead" SET DEFAULT false,
ALTER COLUMN "userUpdate" SET DEFAULT false,
ALTER COLUMN "userDelete" SET DEFAULT false,
ALTER COLUMN "permissionCreate" SET DEFAULT false,
ALTER COLUMN "permissionRead" SET DEFAULT false,
ALTER COLUMN "permissionUpdate" SET DEFAULT false,
ALTER COLUMN "permissionDelete" SET DEFAULT false;
