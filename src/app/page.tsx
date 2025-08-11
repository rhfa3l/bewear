import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import PartnersList from "@/components/common/partners-list";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <Image
          src="/banner-01.svg"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          className="h-auto w-full px-5"
        />
        <PartnersList />
        <ProductList products={products} title="Mais vendidos" />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>
        <Image
          src="/banner-02.svg"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          className="h-auto w-full px-5"
        />
        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
        <Footer />
      </div>
    </>
  );
};

export default Home;
