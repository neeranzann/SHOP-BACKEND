const Order = require('../model/Order');
const mongoose = require('mongoose');


module.exports.getAllOrder = async (req, res) => {

  try {
    const data = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}


module.exports.getOrderById = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid id'
      });
    } else {
      const data = await Order.findById({ _id: id });
      return res.status(200).json(data);
    }

  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }

}



module.exports.order_create = async (req, res) => {

  const {
    orderItems,
    totalPrice
  } = req.body;
  try {

    await Order.create({
      orderItems,
      totalPrice,
      user: req.userId
    });

    return res.status(201).json({
      status: 'success',
      message: 'successfully created'
    });

  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });

  }


}





module.exports.getOrderByUser = async (req, res) => {

  try {

    const data = await Order.find({ user: req.userId });
    return res.status(200).json(data);

  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }

}