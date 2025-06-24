import { Product } from "../../shared/models/product.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Store } from '../../shared/models/store.model.js'
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, discount, category, stock, features, isFeatured } = req.body

  const { storeId } = req.query
  
  if ([title, description, price, discount, category, stock, features, isFeatured].some((field) => field === '')) {
    throw new ApiError(400,'Basic Fields are required')
  }

  if (!storeId) {
    throw new ApiError(400,'StoreId is required')
  }

  const store = await Store.findById(storeId)
  if (!store) {
    throw new ApiError(500,'Store not found with such storeId')
  }

  // handling file
  const pictures = req.files?.pictures
  console.log(pictures)
  const imagesUrls = []

  if (pictures) {
    const pictureArray = Array.isArray(pictures) ? pictures : [pictures]
    
    for (const picture of pictureArray) {
      const res = await uploadOnCloudinary(picture)
      if (res) {
        imagesUrls.push(res.url)
      }
    }

  }

  const newProduct = await Product.create({
    seller: req.user._id,
    store: storeId,
    title,
    description,
    price,
    discount,
    category,
    stock,
    isFeatured,
    features: Array.isArray(features) ? features : features.split(','),
    images : imagesUrls
  })

  if (!newProduct) {
    throw new ApiError(500,'Failed to create new product')
  }

  store.products?.push(newProduct?._id)
  await store.save()

  return res.status(200).json(
    new ApiResponse(200,newProduct,'Product Created Successfully')
  )

})

export const updateProductCredentials = asyncHandler(async (req, res) => {
  const { title, description, price, discount, category, stock, isFeatured, features } = req.body

  const { productId } = req.query
  if (!productId) {
    throw new ApiError(400,'Product ID is required')
  }

  const picturesExist = req.files?.pictures?.length > 0

  const hasUpdateFields =
  "title" in req.body ||
  "description" in req.body ||
  "price" in req.body ||
  "discount" in req.body ||
  "category" in req.body ||
  "stock" in req.body ||
  "isFeatured" in req.body ||
  "features" in req.body ||
  picturesExist;

  if (!hasUpdateFields) {
    throw new ApiError(400,'At least one field is required');
  }

  const picturesLocalPath = req.files?.pictures
  const imagesUrls = []

  if (picturesLocalPath) {
    const pictureArray = Array.isArray(picturesLocalPath) ? picturesLocalPath : [picturesLocalPath]

    for (const picture of pictureArray) {
      const res = await uploadOnCloudinary(picture)
      if (res) {
        imagesUrls.push(res.url)
      }
    }
  }

  const updatePayload = {
    ...("title" in req.body && { title }),
    ...("description" in req.body && { description }),
    ...("price" in req.body && { price }),
    ...("discount" in req.body && { discount }),
    ...("category" in req.body && { category }),
    ...("stock" in req.body && { stock }),
    ...("isFeatured" in req.body && { isFeatured }),
    ...("features" in req.body && { features }),
    ...(picturesExist && { images: imagesUrls }),
  }

  const product = await Product.findByIdAndUpdate(
    productId,
    updatePayload,
    {new : true}
  )

  return res.status(200).json(
    new ApiResponse(200,product,'Product Credentials Updated Successfully')
  )
})