import Multer from 'multer';

const multer = Multer({
  storage: new Multer.memoryStorage(),
});

export default multer;