const  {Cloudinary} = require('@cloudinary/url-gen')

export const cloudinary = new Cloudinary({
    cloud:{
        cloudName:process.env.CLOUDINARYNAME,
    },
    URL:{
    secure:true,
    }
})