import {v2 as cloudinary} from "cloudinary";
import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config({path: './.env'})

//configuration
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath){
            return null
        }
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type : 'auto'})

        return response
        
        setTimeout(() => {
            fs.unlinkSync(localFilePath)
            console.log(`File ${localFilePath} deleted after upload.`)
        }, 4000);

    } catch (error) {
        console.log('Error occured while uploading on cloudinary')
    }
}

export {uploadOnCloudinary}
