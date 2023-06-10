const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const checkPass = bcrypt.compareSync(password, userExist.password);
      if (checkPass) {
        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, 'tokenGenerate');
        return res.status(200).json({
          status: 'success',
          user: {
            token,
            email,
            fullname: userExist.fullname,
            isAdmin: userExist.isAdmin,
            shippingAddress: userExist.shippingAddress
          }
        });

      } else {
        return res.status(401).json({
          status: 'error',
          message: 'invalid credential'
        });
      }

    } else {
      return res.status(401).json({
        status: 'error',
        message: 'user doesn\'t exist'
      });

    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


module.exports.userSignUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        status: 'error',
        message: 'user already exist'
      });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      await User.create({
        fullname,
        email,
        password: hashedPass
      });
      return res.status(201).json({
        status: 'success',
        message: 'user successfully registered'
      });

    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}




module.exports.getUserById = async (req, res) => {

  try {

    const user = await User.findById({ _id: req.userId });
    if (user) {
      res.status(200).json({
        status: 'success',
        user: {
          token: user.token,
          email: user.email,
          fullname: user.fullname,
          isAdmin: user.isAdmin,
          shippingAddress: user.shippingAddress
        }
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'user not exist'
      });

    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}



module.exports.userUpdate = async (req, res) => {
  try {

    const user = await User.findById({ _id: req.userId });
    if (user) {
      user.fullname = req.body.fullname || user.fullname;
      user.email = req.body.email || user.email;
      user.shippingAddress = req.body.shippingAddress || user.shippingAddress;
      await user.save();
      return res.status(200).json({
        status: 'success',
        message: 'successfully update'
      });
    } else {

      return res.status(400).json({
        status: 'error',
        message: 'user not exist'
      });

    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}







const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const checkPass = bcrypt.compareSync(password, userExist.password);
      if (checkPass) {
        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, 'tokenGenerate');
        return res.status(200).json({
          status: 'success',
          user: {
            token,
            email,
            fullname: userExist.fullname,
            isAdmin: userExist.isAdmin,
            shippingAddress: userExist.shippingAddress
          }
        });

      } else {
        return res.status(401).json({
          status: 'error',
          message: 'invalid credential'
        });
      }

    } else {
      return res.status(401).json({
        status: 'error',
        message: 'user doesn\'t exist'
      });

    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}


module.exports.userSignUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({
        status: 'error',
        message: 'user already exist'
      });
    } else {
      const hashedPass = await bcrypt.hash(password, 10);
      await User.create({
        fullname,
        email,
        password: hashedPass
      });
      return res.status(201).json({
        status: 'success',
        message: 'user successfully registered'
      });

    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}




module.exports.getUserById = async (req, res) => {

  try {

    const user = await User.findById({ _id: req.userId });
    if (user) {
      res.status(200).json({
        status: 'success',
        user: {
          token: user.token,
          email: user.email,
          fullname: user.fullname,
          isAdmin: user.isAdmin,
          shippingAddress: user.shippingAddress
        }
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'user not exist'
      });

    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}



module.exports.userUpdate = async (req, res) => {
  try {

    const user = await User.findById({ _id: req.userId });
    if (user) {
      user.fullname = req.body.fullname || user.fullname;
      user.email = req.body.email || user.email;
      user.shippingAddress = req.body.shippingAddress || user.shippingAddress;
      await user.save();
      return res.status(200).json({
        status: 'success',
        message: 'successfully update'
      });
    } else {

      return res.status(400).json({
        status: 'error',
        message: 'user not exist'
      });

    }


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}







module.exports.getAllUser = async (req, res) => {

  try {

    const users = await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}