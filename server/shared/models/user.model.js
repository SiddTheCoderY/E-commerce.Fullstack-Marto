import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateJWTToken } from '../config/jwt.js'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: {
      type: String,
      required: true,
      trim: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  phoneNumber : {
    type : Number
  },
  Address : {
    type : 'String'
  },
  verified: {
    type: Boolean,
    default: false
  },
  socialHandles: [],

  role : {
    type : String,
    enum : ['consumer','selller','admin'],
    default : 'consumer'
  },
  wishListProducts : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],


  //if seller then 
  stores : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Store'
    },
  ],
  products : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Product'
    },
  ],
  
  refreshToken: {
    type: String,
  }

},{ timestamps: true,}); 


//bcrypt password just before saving the userSchema
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


//creating new method to compare password using bcrypt
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// generate access token
userSchema.methods.generateAccessToken = function () {
  return generateJWTToken(
    {
        _id : this._id,
        username : this.username,
        fullName : this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    process.env.ACCESS_TOKEN_EXPIRY
  )
}

//generate refresh Token
userSchema.methods.generateRefreshToken = function () {
    return generateJWTToken(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_EXPIRY
      )
}


export const User = mongoose.model('User', userSchema);
