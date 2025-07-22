import { getCJAccessToken, fetchCJProducts } from "./seatedService.js";
import { Product } from "../../../shared/models/product.model.js";

export async function syncCJProductToDB() {
  const token = await getCJAccessToken();
  if (!token) return console.error("❌ No CJ token, aborting sync");

  const products = await fetchCJProducts(token);
  if (products.length === 0) return console.log("❌ No products returned");

  console.log("✅ CJ Products Fetched:", products);
  const product = products[0];
  console.log("🚀 Syncing CJ Product:", product);

  // const newProduct = new Product({
  //   title : product.nameEn || "Unnamed Product",
  //   description: product.descriptionEn || "No description",
  //   price: Number(product.sellPrice) || 0,
  //   images: product?.productImages || [],
  //   isDropshipped: true,
  //   supplierType: "api",
  //   externalId: product.id,
  //   dropshipInfo: {
  //     source: "cj",
  //     rawData: product,
  //   },
  // });

  // await newProduct.save();
  // console.log("✅ Product inserted:", newProduct._id);
}
