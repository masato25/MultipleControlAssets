var MultipleControlAssets = artifacts.require('./MultipleControlAssets.sol')

var Web3 = require('web3');
var webserver = 'http://172.18.0.1:8545'
var web3 = new Web3(new Web3.providers.HttpProvider(webserver))
var Tx = require('ethereumjs-tx');
var BN = require('bn.js')

contract('MultipleControlAssets', (accounts) => {
  var instance;
  var depolyContract = async (inst) => {
    instance = await MultipleControlAssets.deployed();
  }
  depolyContract();

  // var privateKey = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3"
  // 0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef (accounts[2])
  var privateKeyWithout0x = "0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1";
  var privateKey = "0x" + privateKeyWithout0x;
  web3.eth.accounts.wallet.add({
    privateKey,
    address: '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef'})

  it('send one ether to contract', async function() {
      var targetAddr = instance.address;
      console.log(`targetAddr: ${targetAddr}`);
      // // var rawTx = {
      // //   nonce: '0x00',
      // //   gasPrice: '0x09184e72a000',
      // //   gasLimit: '0x2710',
      // //   to: targetAddr,
      // //   value: '0x' + web3.utils.toWei(`${1}`, 'ether'),
      // //   data: '0x00'
      // // }
      // // var tx = new Tx(rawTx);
      // // tx.sign(new Buffer(privateKeyWithout0x, 'hex'));
      // // var serializedTx = tx.serialize();
      // // // var mytx = await web3.eth.signTransaction(rawTx);
      // // console.log(serializedTx)
      // // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
      // // // .on('receipt', console.log);
      // // web3.eth.sendTransaction(mytx).then(console.log);
      // // // web3.eth.getBalance(targetAddr).then(s => console.log(`contract [${targetAddr}] balance: ${s}`));
      //
      // const a = await web3.eth.sendTransaction({
      //   from: "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef",
      //   to: targetAddr,
      //   value: new BN(1000000000000000000),
      //   // gasPrice: 40000000000,
      //   // gas: 35000,
      // });
      // console.log(a);
  });
  //
  // it('ecrecover result matches address', async function() {
  //   var noce = await instance._c_noce();
  //   var toAddr = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
  //   var numberOfEth = 0.1;
  //   var value = web3.utils.toWei(`${numberOfEth}`, 'ether');
  //   message = web3.utils.soliditySha3(toAddr, value, noce);
  //   var h = web3.utils.soliditySha3("\x19Ethereum Signed Message:\n32", message);
  //   var sig = web3.eth.accounts.sign(message, privateKey);
  //   assert.equal(sig.messageHash, h);
  //   var result0 = await instance.isVaildRecevier(toAddr);
  //   assert.equal(result0, true);
  //   console.log(toAddr, value, noce, sig.signature);
  //   var result1 = await instance.checkSignature.call(toAddr, value, noce, sig.signature, {account: accounts[0]});
  //   assert.equal(result1, true)
  //
  //   // var result = await instance._c_noce()
  //   // assert.equal(result.s, 2)
  // })
})
