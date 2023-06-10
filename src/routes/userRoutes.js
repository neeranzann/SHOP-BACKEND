const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/authRoute');

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required()
});

const signUpSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(25).required(),
  fullname: Joi.string().min(5).max(25).required(),
});

const methodNotAllowed = (req, res) => res.status(405).json({ message: 'method not allowed' });


router.route('/api/userLogin').post(validator.body(loginSchema), userController.userLogin).all(methodNotAllowed);

router.post('/api/userSignUp', validator.body(signUpSchema), userController.userSignUp);

router.patch('/api/userUpdate', auth.checkUser, userController.userUpdate);

router.get('/api/userById', auth.checkUser, userController.getUserById);
router.get('/api/getAllUser', auth.checkAdmin, userController.getAllUser);


module.exports = router;