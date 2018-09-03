var Poye = artifacts.require('../contracts/poye.sol');

module.exports = function(deployer) {
    deployer.deploy(Poye);
};