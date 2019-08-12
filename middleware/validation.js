const { ReE } = require('../services/util.service');

let createUservalidation = async function (req, res, next) {
    const { Email, FName, LName, roleId, organizationId, password } = req.body;
    
    if (!Email || Email === '')
        return await ReE(res, 'Please enter an email to register.', 400);

    if (!FName || FName === '')
        return await ReE(res, 'Please enter an Firstname to register.', 400); 
     
    if (!roleId || roleId === '')
        return await ReE(res, 'Please enter an role Id to register.', 400);
     
    if (!organizationId || organizationId === '')
    return await ReE(res, 'Please enter an organization Id to register.', 400);
    
    if (!password || password === '')
    return await ReE(res, 'Please enter an password to register.', 400);

    next();
}

let verifyUservalidation = async function (req, res, next) {
    const { Email, password } = req.body;
    
    if (!Email || Email === '')
        return await ReE(res, 'Please enter an email to register.', 400);

    if (!password || password === '')
    return await ReE(res, 'Please enter an password to register.', 400);

    next();
}

module.exports.createUservalidation = createUservalidation;
module.exports.verifyUservalidation = verifyUservalidation;