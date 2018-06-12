var MultipleControlAssets = artifacts.require("./MultipleControlAssets.sol");

module.exports = function(deployer) {
  deployer.deploy(MultipleControlAssets,
    //submitter
    "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", "0xf17f52151EbEF6C7334FAD080c5704D77216b732",
    //verifier && inspector
    "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef", "0x8B5724B57a75482b2b1d5D3EB4F429D0E8D367c6"
  );
};
