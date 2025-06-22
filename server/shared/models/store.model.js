import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    storeName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String
    },
    logo: {
      type: String
    },
    banner: {
      type: String
    },
    category: {
        type: String,
        enum: [
          //Books
          'Books',
          
          // 🏠 Electronics & Appliances
          'Mobiles & Tablets',
          'Laptops & Accessories',
          'TVs & Home Entertainment',
          'Cameras & Photography',
          'Audio Devices',
          'Smartwatches & Wearables',
          'Home Appliances',
          'Kitchen Appliances',
    
          // 👗 Fashion & Lifestyle
          'Men\'s Fashion',
          'Women\'s Fashion',
          'Kids & Baby Fashion',
          'Footwear',
          'Watches & Accessories',
          'Jewelry',
          'Bags & Wallets',
    
          // 🛋️ Home & Living
          'Furniture',
          'Home Decor',
          'Kitchen & Dining',
          'Bedding & Bath',
          'Cleaning & Laundry',
          'Tools & Home Improvement',
    
          // 🛒 Groceries & Essentials
          'Food Staples',
          'Beverages',
          'Snacks & Instant Food',
          'Personal Care',
          'Baby Care',
          'Health & Hygiene',
          'Pet Supplies',
    
          // 🎮 Entertainment & Hobbies
          'Books & Stationery',
          'Musical Instruments',
          'Games & Toys',
          'Sports & Fitness',
          'Art & Craft',
          'Gaming & Console',
    
          // 🧰 Automotive & Tools
          'Automotive Accessories',
          'Motorbike Gear',
          'Car Cleaning Tools',
          'Spare Parts & Tools',
    
          // 🏢 Office & Industrial
          'Office Supplies',
          'Business Equipment',
          'Safety & Security',
          'Construction Materials',
    
          // 🧳 Travel & Outdoors
          'Luggage & Travel Gear',
          'Camping & Hiking',
          'Outdoor Accessories',
    
          // 📿 Nepali Cultural / Local Products
          'Handicrafts',
          'Pashmina & Woolen Wear',
          'Madal & Folk Instruments',
          'Religious Items',
          'Organic & Local Goods'
        ],
        required: true
    },
    contactEmail: {
      type: String,
      trim: true
    },
    contactNumber: {
      type: String
    },
    address: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    ratingUsers : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    status: {
        enum : ["active", "inactive", "banned"],
        default : 'active'
    },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    socialLinks: {
        instagram: String,
        facebook: String,
        website: String
    },
    
  }, { timestamps: true });

export const Store = mongoose.model('stores',storeSchema)  
  