const cloudinary = require("cloudinary")


// config to acces my cloudinary account

cloudinary.config({
    cloud_name : 'dgqiognni',
    api_key : '671792999569852',
    api_secret : 'm0e0cmKm2ax2nJ-3CgmP8XuNYFE'
})

// export cloudinary config and upload from local to cloud

exports.uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
            resolve({url: result.url, id : result.public_id})
        }, {resource_type: 'auto'})
    })
}