-- CreateTable
CREATE TABLE "helper_tbl" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "helper_tbl_pkey" PRIMARY KEY ("id")
);
