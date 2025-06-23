import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Store } from '../../shared/models/store.model.js'
import { v4 as uuidv4 } from 'uuid'
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { User } from "../../shared/models/user.model.js";
import dayjs from 'dayjs'


export const createStore = asyncHandler(async (req, res) => {
  const { storeName, description, category, contactEmail, contactNumber, address, socialLinks } = req.body
  
  if ([storeName, category, contactEmail, contactNumber, address].some((field) => field?.trim() === '')) {
    throw new ApiError(400,'Basic Fields are required')
  }

  const existingStore = await Store.findOne({ storeName });
  if (existingStore) {
    throw new ApiError(409, 'Store name already taken');
  }

  //handling file (logo,banner)
  const logoLocalPath = req.files?.logo?.length ? req.files.logo[0].path : null;
  const bannerLocalPath = req.files?.banner?.length ? req.files.banner[0].path : null;
  
  let logoUrl;
  let bannerUrl;
  
  if (logoLocalPath) {
    const response = await uploadOnCloudinary(logoLocalPath);
    if (response) {
      logoUrl = response.url;
    }
  }
  
  if (bannerLocalPath) {
    const response = await uploadOnCloudinary(bannerLocalPath);
    if (response) {
      bannerUrl = response.url;
    }
  }
   

  // store ID
  const storeId = uuidv4()

  const store = await Store.create({
    owner: req.user?._id,
    storeName,
    description : description ? description : `Find all your need here at ${storeName}`,
    logo : logoUrl,
    banner : bannerUrl,
    category,
    contactEmail,
    contactNumber,
    address,
    socialLinks : socialLinks ? socialLinks : null,
    storeId
  })

  await User.findByIdAndUpdate(req.user._id, {
    $push: { stores: store._id }
  });


  return res.status(200).json(
    new ApiResponse(200,store,'Store Created Successfully')
  )
})

export const updateStoreCredentials = asyncHandler(async (req, res) => {
  const { storeName, description, contactEmail, contactNumber, address, socialLinks } = req.body
  const { storeId } = req.query
  
  if (!(description || contactEmail || contactNumber || address || socialLinks || storeName )) {
    throw new ApiError(400,'Atleast one field is required to update credentials')
  }

  if (!storeId) {
    throw new ApiError(400, 'Store ID is required')
  }

  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError(404, 'Store not found');
  }

  // Prevent storeName update if within 7 days
  if (storeName && store.storeName !== storeName) {
    const lastUpdated = store.lastStoreNameUpdate;
    const now = dayjs();

    if (lastUpdated && now.diff(dayjs(lastUpdated), 'day') < 7) {
      throw new ApiError(403, `Store name can only be changed once every 14 days. Try again after ${dayjs(lastUpdated).add(14, 'day').format('DD MMM YYYY')}`);
    }
  }


  // handling file if available
  const logoLocalPath = req.files?.logo?.length ? req.files.logo[0].path : null
  const bannerLocalPath = req.files?.banner?.length ? req.files.banner[0].path : null

  let logo , banner;

  if (logoLocalPath) {
    const res = await uploadOnCloudinary(logoLocalPath)
    if (res) {
      logo = res.url
    }
  }
  if (bannerLocalPath) {
    const res = await uploadOnCloudinary(bannerLocalPath)
    if (res) {
      banner = res.url
    }
  }

  // Prepare update object (    ...(condition && { key: value })  if conditon true then the object get added otherwise not  )
  const updatePayload = {
    ...(storeName && { storeName, lastStoreNameUpdate: new Date() }),
    ...(description && { description }),
    ...(contactEmail && { contactEmail }),
    ...(contactNumber && { contactNumber }),
    ...(address && { address }),
    ...(socialLinks && { socialLinks }),
    ...(logo && { logo }),
    ...(banner && { banner }),
  };

  const updatedStore = await Store.findByIdAndUpdate(
    storeId,
    updatePayload,
    { new: true }
  );

  res.status(200).json(
    new ApiResponse(200, updatedStore, "Store credentials updated successfully")
  );

})