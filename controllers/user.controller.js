const Organization = require('./../models').organization;
const Role = require('./../models').role;
const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service');


const create = async function (req, res) {
    const body = req.body;

    if (!body.unique_key && !body.email) {
        return await ReE(res, 'Please enter an email register.');
    } else if (!body.password) {
        return await ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) return await ReE(res, err, 401);
        return await ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
}
module.exports.create = create;

const get = async function (req, res) {
    let user = req.user;
    let err, organization, role;
    
    [err, organization] = await to(Organization.findOne({ where: { OrganizationId: user.OrganizationId } }));
    if (err) return await ReE(res, "err finding organization related to user");
    [err, role] = await to(Role.findOne({ where: { RoleId: user.RoleId } }));
    if (err) return await ReE(res, "err finding role");

    return await ReS(res, Object.assign( { user: user.toWeb() }, { role: role.toWeb() }, { organization: organization.toWeb() }));
}
module.exports.get = get;

const login = async function (req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return await ReE(res, err, 401);

    return await ReS(res, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.login = login;