import Multer from 'multer';

import config from '../config/cloudinaryConfig.js';

const cloudinary = config();

const upload = {
  cloudinary: async (file, folder, publicId) => {
    const options = {
      folder: `blog/${folder}`,
      use_filename: true,
    };

    if (publicId) options.public_id = publicId;
  
    const res = await cloudinary.uploader.upload(file, options);
  
    return res;
  },
  multer: Multer({
    storage: new Multer.memoryStorage(),
  }),
}

export default upload;