pragma solidity ^0.4.0;

contract Example {

    uint256 _cnoce = 2;

    function getNoce() public view returns(uint256) {
      return _cnoce;
    }

    function incraseNoce() public returns(bool) {
      _cnoce = _cnoce + 1;
      return true;
    }

    function testRecovery(bytes32 _msg, uint8 v, bytes32 r, bytes32 s) public pure returns (address) {
        address addr = ecrecover(_msg, v, r, s);
        return addr;
    }

    function hashGen(string _msg, uint256 _noce) public pure returns(bytes32) {
      bytes32 tmp1 = keccak256(_msg, _noce);

      return keccak256("\x19Ethereum Signed Message:\n32", tmp1);
    }

    function hashPaymentGen(address _from, address _to, uint256 _value) public view returns(bytes32) {
      bytes32 tmp1 = keccak256(_from, _to, _value, _cnoce);

      return keccak256("\x19Ethereum Signed Message:\n32", tmp1);
    }

    function splitSignature(bytes sig)
        public
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
