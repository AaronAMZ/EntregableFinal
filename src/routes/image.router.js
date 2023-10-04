const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(getAll)
    .post(upload.single('image'), create)
    .delete(remove)

module.exports = imageRouter;