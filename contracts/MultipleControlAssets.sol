pragma solidity ^0.4.18;

contract MultipleControlAssets {
  using SafeMath for uint256;
  uint256 public _c_noce = 1;
  mapping (address => bool) _vaild_withdraw_addr;
  mapping (address => bool) _vaild_sign_addr;
  event sendEther(address accountAddress, uint256 amount, uint256 noce, uint256 next_noce);
  event Deposit(address _sendAddr, uint256 _sendValue);

  /* uint256 lockDate; */

  //constructor
  function MultipleControlAssets(address _a1, address _a2, address _b1,  address _b2) public {
    _vaild_withdraw_addr[_a1] = true;
    _vaild_withdraw_addr[_a2] = true;
    _vaild_sign_addr[_b1] = true;
    _vaild_sign_addr[_b2] = true;
  }

  function()
    public payable
  {
    if (msg.value > 0)
      emit Deposit(msg.sender, msg.value);
  }


  function getCurrentNoce() public view returns (uint256) {
    return _c_noce;
  }

  function isVaildWithdrawUser(address _mi) public view returns (bool){
    return _vaild_withdraw_addr[_mi];
  }

  function isVaildSignUser(address _mi) public view returns (bool){
    return _vaild_sign_addr[_mi];
  }

  function isVaildRecevier(address _to) public view returns (bool){
    return _vaild_withdraw_addr[_to] || _vaild_sign_addr[_to];
  }

  function checkSignature(address _to, uint256 _value, uint256 _noce, bytes _signature) public returns (bool) {
    require(_noce == _c_noce);
    require(_vaild_withdraw_addr[_to] || _vaild_sign_addr[_to]);
    bytes32 _msg = genHash(_to, _value, _noce);

    uint8 v;
    bytes32 r;
    bytes32 s;
    (v, r, s) = splitSignature(_signature);

    address singAddr = ecrecover(_msg, v, r, s);
    require(_vaild_sign_addr[singAddr]);
    _to.transfer(_value);
    _c_noce = _c_noce.add(1);
    emit sendEther(_to, _value, _noce, _c_noce);
    return _vaild_sign_addr[singAddr];
  }

  function genHash(address _to, uint256 _value, uint256 _noce)
    internal
    pure
    returns (bytes32)
  {
    bytes32 tmp1 = keccak256(_to, _value, _noce);
    return keccak256("\x19Ethereum Signed Message:\n32", tmp1);
  }

  function splitSignature(bytes sig)
      internal
      pure
      returns (uint8, bytes32, bytes32)
  {
      require(sig.length == 65);

      bytes32 r;
      bytes32 s;
      uint8 v;

      assembly {
          // first 32 bytes, after the length prefix
          r := mload(add(sig, 32))
          // second 32 bytes
          s := mload(add(sig, 64))
          // final byte (first byte of the next 32 bytes)
          v := byte(0, mload(add(sig, 96)))
      }

      return (v, r, s);
  }

}

library SafeMath {

  /**
  * @dev Multiplies two numbers, throws on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
    if (a == 0) {
      return 0;
    }
    c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
  * @dev Integer division of two numbers, truncating the quotient.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }

  /**
  * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  /**
  * @dev Adds two numbers, throws on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
    c = a + b;
    assert(c >= a);
    return c;
  }
}
