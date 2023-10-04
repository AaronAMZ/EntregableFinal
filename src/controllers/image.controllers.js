const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const results = await Image.findAll();
    return res.json(results)
});

const create = catchError(async(req, res) => {
    const { path, filename } = req.file;
    const { url, public_id } = await uploadToCloudinary(path, filename);
    const image = await Image.create({ url, publicId: public_id });
    return res.status(201).json(image);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Image.destroy({ where: {id} });
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}