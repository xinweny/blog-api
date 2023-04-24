import config from '../config/cloudinaryConfig.js';

const cloudinary = config();

const upload = async (file, folder, publicId) => {
  const options = {
    folder: `blog/${folder}`,
    use_filename: true,
  };

  if (publicId) options.public_id = publicId;

  const res = await cloudinary.uploader.upload(file, options);

  return res;
};

export default upload;