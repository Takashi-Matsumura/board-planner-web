-- CreateTable
CREATE TABLE "schedules_tbl" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "helper_name" TEXT,
    "customer_name" TEXT,
    "comment" TEXT,
    "begin_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),

    CONSTRAINT "schedules_tbl_pkey" PRIMARY KEY ("id")
);
