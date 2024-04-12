const cloudinary = require("cloudinary");
const {CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET} = require("../config")



cloudinary.v2.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
    secure:true
})



async function uploadImage(filePath){
    return await cloudinary.v2.uploader.upload(filePath,{
        folder: 'replit'

    })
}

async function deleteImage(publicId){
    return await cloudinary.v2.uploader.destroy(publicId)
}

module.exports = {
    uploadImage,
    deleteImage
}