const { User, Login } = require('../models');
const validator = require('validator');
const { to, TE } = require('../services/util.service');

const createUser = async (userInfo) => {
    let auth_info, err;

    auth_info = {};
    auth_info.status = 'create';
    userInfo.SignUpTime = new Date();
    if (validator.isEmail(userInfo.email)) {

        [err, user] = await to(User.create(userInfo));
        if (err) TE('user already exists with that email');
        [err, login] = await to(Login.create(userInfo));
        if (err) TE('failed to signup user');
        return login;
    } else {
        TE('A valid email was not entered.');
    }
}
module.exports.createUser = createUser;

const authUser = async function (userInfo) {
    let auth_info = {};
    auth_info.status = 'login';

    if (!userInfo.password) TE('Please enter a password to login');
    if (!userInfo.email) TE('Please enter a email to login');

    let user;
    if (validator.isEmail(userInfo.email)) {
        [err, user] = await to(User.findOne({ where: { Email: userInfo.email } }));
        if (err) TE(err.message);
        [err, login] = await to(Login.findOne({ where: { Email: userInfo.email, UsrId: user.UserId } }));
        if (err) TE(err.message);
    } else {
        TE('A valid email was not entered');
    }

    if (!user) TE('Not registered');

    [err, login] = await to(login.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return login;

}
module.exports.authUser = authUser;