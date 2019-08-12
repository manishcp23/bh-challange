const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

const custom = require('../middleware/custom');
const validation = require('../middleware/validation');
const passport = require('passport');
const path = require('path');


require('../middleware/passport')(passport)
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ status: "success", message: "Welcome to BH Challange."})
});


router.post('/users', validation.createUservalidation, custom.organization, custom.role, UserController.create);                                                    // C

router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get);

router.post('/users/verify', validation.verifyUservalidation, UserController.login);

module.exports = router;
