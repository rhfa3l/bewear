import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import VariantSelector from "@/app/product-variant/[slug]/components/variant-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantity-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl px-5"
        />
        <div className="px-5">
          <VariantSelector
            selectedVariant={slug}
            variants={productVariant.product.variants}
          />
        </div>
        <div className="px-5">
          <h3 className="text-lg font-semibold">
            {productVariant.product.name}
          </h3>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>
        <QuantitySelector />
        <div className="flex flex-col space-y-4 px-5">
          <Button variant="outline" size="lg" className="rounded-full">
            Comprar agora
          </Button>
          <Button size="lg" className="rounded-full">
            Adicionar à sacola
          </Button>
        </div>
        <div className="px-5">
          <p className="text-shadow-amber-600">
            {productVariant.product.description}
          </p>
        </div>
        <ProductList title="Talvez você goste" products={likelyProducts} />
      </div>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
