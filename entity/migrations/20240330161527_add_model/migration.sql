-- CreateTable
CREATE TABLE "Users" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id_order" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "total_pint" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id_order_item" SERIAL NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_book" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_point" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id_order_item")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id_tag" SERIAL NOT NULL,
    "tag_name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "Books" (
    "id_book" SERIAL NOT NULL,
    "writer" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "point" INTEGER NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "id_tag" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id_book")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_user_key" ON "Orders"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_id_order_key" ON "OrderItem"("id_order");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Orders"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tags"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;
