var Web3 = require('web3');
var webserver = 'http://172.18.0.1:8545'
var web3 = new Web3(new Web3.providers.HttpProvider(webserver))
var Tx = require('ethereumjs-tx');
var BN = require('bn.js')

var defAccount = '0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef'
var privateKey = "0x0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1";
web3.eth.accounts.wallet.add({
  privateKey,
  address: defAccount})
web3.eth.defaultAccount = defAccount
// console.log(web3.eth.defaultAccount)

var sendTO = '0x8B5724B57a75482b2b1d5D3EB4F429D0E8D367c6'

var  signTx = async () => {
  var _dx = await web3.eth.accounts.signTransaction({
      gasPrice: "20000000000",
      gas: 21000,
      to: sendTO,
      value: `${web3.utils.toWei(`${1}`, 'ether')}`,
      data: ""
  }, defAccount)
  console.log(_dx)
  // web3.eth.sendTransaction(_dx, console.log)

  var rawTx = {
    from: defAccount,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    gas: 21000,
    value: '1000000000000000'
  };
  var tx = new Tx(rawTx);
  tx.sign(new Buffer('0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1'));
  var serializedTx = tx.serialize();

  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // web3.eth.signTransaction({
  //   from: defAccount,
  //   to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
  //   gas: 21000,
  //   value: '1000000000000000'
  // }).then(function(error, hash){
  //   console.log(error, hash);
  // });
  // web3.eth.sendTransaction({
  //   from: defAccount,
  //   to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
  //   gas: 21000,
  //   value: '1000000000000000'
  // }).then(function(error, hash){
  //   console.log(error, hash);
  // });

}
signTx()
