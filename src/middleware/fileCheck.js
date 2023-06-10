const path = require('path');
const fs = require('fs');



module.exports.fileCheck = (req, res, next) => {
  try {

    if (!req.files || !req.files.product_image) {
      return res.status(400).json({
        status: 'error',
        message: 'please provide an image'
      });
    } else {
      const extensions = ['.jpg', '.png', '.jpeg'];
      const file = req.files.product_image;
      const ext = path.extname(file.name);
      if (extensions.includes(ext)) {
        file.mv(`./uploads/images/${file.name}`, (err) => {

        });
        req.imagePath = `/uploads/images/${file.name}`;
        return next();
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'please provide a valid image'
        });
      }

    }

  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}




module.exports.updateCheck = (req, res, next) => {
  try {

    if (!req.files || !req.files.product_image) {
      console.log('hello2');
      return next();
    } else {
      console.log('hello');

      if (!req.files.product_image || !req.query.imagePath) {
        return res.status(400).json({
          status: 'error',
          message: 'please provide a valid image and imagePath'
        });

      } else {
        const extensions = ['.jpg', '.png', '.jpeg'];
        const file = req.files.product_image;
        const ext = path.extname(file.name);
        if (extensions.includes(ext)) {
          file.mv(`./uploads/images/${file.name}`, (err) => {

          });

          fs.unlink(`.${req.query.imagePath}`, (err) => {

          })

          req.newImagePath = `/uploads/images/${file.name}`;
          return next();
        } else {
          return res.status(400).json({
            status: 'error',
            message: 'please provide a valid image'
          });
        }

      }


    }

  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}