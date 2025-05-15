import { notFound } from "next/navigation"
import { getProductById, getRelatedProducts } from "@/lib/data/actions"
import { ProductDetails } from "../components/product-details"
import { ProductGallery } from "../components/product-gallery"
import { RelatedProducts } from "../components/related-products"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const relatedProducts = await getRelatedProducts(product.id, product.categoryId)

  return (
    <div className="container px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/landingpage">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/landingpage#products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/landingpage/products/category/${product.categoryId}`}>
                  {product.category?.name || "Category"}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="truncate max-w-[200px] inline-block">{product.name}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Back button */}
      <Link
        href="/landingpage#products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Gallery */}
        <ProductGallery product={product} />

        {/* Product Details */}
        <ProductDetails product={product} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
    </div>
  )
}
