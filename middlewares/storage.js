import multer, { memoryStorage } from 'multer';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { InternalServerError } from './error.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// Upload to Supabase storage
const supabaseUpload = async (req, res, next) => {
  try {
    const fileName = Date.now() + '-' + req.file.originalname;

    const { error } = await supabase.storage
      .from('file-uploader')
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    req.file.publicUrl =
      process.env.SUPABASE_URL +
      '/storage/v1/object/public/file-uploader/' +
      fileName;
    next();
  } catch (error) {
    console.error(error);
    next(new InternalServerError());
  }
};

// Dev storage
const devStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

// production will use memory storage and supabase, other env use diskStorage
const createUploadMiddleware = () => {
  const multerConfig = {
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  };

  if (process.env.NODE_ENV === 'production') {
    return [
      multer({ storage: memoryStorage(), ...multerConfig }).single('file'),
      supabaseUpload,
    ];
  } else {
    return [multer({ storage: devStorage, ...multerConfig }).single('file')];
  }
};

export const uploadMiddleware = createUploadMiddleware();
