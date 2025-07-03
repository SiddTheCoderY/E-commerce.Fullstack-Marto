import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    description: String,
  
    discountType: {
      type: String,
      enum: ['percentage', 'flat'],
      required: true
    },
    discountValue: {
      type: Number,
      required: true
    },
  
    minOrderValue: {
      type: Number,
      default: 0
    },
    maxDiscountValue: {
      type: Number // for percentage caps
    },
  
    usageLimit: {
      type: Number, // total allowed uses across platform
      default: 1
    },
    usedCount: {
      type: Number,
      default: 0
    },
  
    perUserLimit: {
      type: Number,
      default: 1
    },
  
    validFrom: {
      type: Date,
      required: true
    },
    validTill: {
      type: Date,
      required: true
    },
  
    isActive: {
      type: Boolean,
      default: true
    },
  
    applicableUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    
    applicableStores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
      }
    ]
}, { timestamps: true });

export const Coupon = mongoose.model('Coupon',couponSchema)