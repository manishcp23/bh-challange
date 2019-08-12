/* eslint-env mocha */
require('mocha');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const utils = require('../../lib/utils');

chai.use(chaiAsPromised);
chai.should();

describe('#Utils', () => {
  it('should return current environment', () => {
    process.env.NODE_ENV = 'staging';
    utils.reset();
    utils.environment.should.equal('staging');
  });

  it('utils conf should return current configuration object', () => {
    utils.conf.should.be.an('object');
  });

  it('set conf should return true', () => {
    const testconf = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'config', 'config.json')));
    return utils.setConf(testconf).should.eventually.be.true;
  }); 

  it('boxConf should return an object', () => utils.boxConf.should.be.an('object'));

  it('boxConf should contain a publickey id', () => utils.boxConf.should.have.property('boxAppSettings'));
});