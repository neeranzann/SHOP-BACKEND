const jwt = require('jsonwebtoken');





module.exports.checkAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decode = jwt.decode(token, 'tokenGenerate');

      if (decode && decode.isAdmin) {
        req.userId = decode.id;
        return next();
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'you are not authourised'
        });
      }

    } else {
      return res.status(401).json({
        status: 'error',
        message: 'you are not authourised'
      });
    }


  } catch (err) {

    return res.status(401).json({
      status: 'error',
      message: 'you are not authorised'
    });
  }



}



module.exports.checkUser = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decode = jwt.decode(token, 'tokenGenerate');
      if (decode) {
        req.userId = decode.id;
        return next();
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'you are not authourised'
        });
      }

    } else {
      return res.status(401).json({
        status: 'error',
        message: 'you are not authourised'
      });
    }


  } catch (err) {

    return res.status(401).json({
      status: 'error',
      message: 'you are not authorised'
    });
  }



}