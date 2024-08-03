import {Cloudinary} from '@cloudinary/url-gen'

export const cloudinary = new Cloudinary({
    cloud:{
        cloudName:process.env.CLOUDINARYNAME,
    },
     // @ts-ignore
    URL:{
    secure:true,
    }
})