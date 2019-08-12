const Organization = require('./../models').organization;
const Role = require('./../models').role;
const { to, ReE, ReS } = require('../services/util.service');

let organization = async function (req, res, next) {
    let organizationId, err, organization;
    organizationId = req.body.organizationId;

    [err, organization] = await to(Organization.findOne({ where: { OrganizationId: organizationId } }));
    if (err) return await ReE(res, "err finding organization");
    if (!organization)
        return await ReE(res, "Company not found with id: " + organizationId);
    next();
}

let role = async function (req, res, next) {
    let roleId, err, role;
    roleId = req.body.roleId;

    [err, role] = await to(Role.findOne({ where: { RoleId: roleId } }));
    if (err) return await ReE(res, "err finding role");

    if (!role) return await  ReE(res, "Role not found with id: " + roleId);
    next();
}

module.exports.role = role;
module.exports.organization = organization;