-- CreateTable
CREATE TABLE "GenerateQrCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GenerateQrCode_pkey" PRIMARY KEY ("id")
);
