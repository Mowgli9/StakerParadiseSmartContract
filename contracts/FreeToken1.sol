//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract FreeToken1 is ERC20 {
    constructor() ERC20("FreeToken1", "FT1") {
        _mint(address(this), 1000000000 * 10**18);
    }


    
    function getFree(uint256 _amount) external {
        require(_amount <= 1000, "you can't get more than 1000 per Tx");
        IERC20(address(this)).transfer(msg.sender ,_amount*10**18);
    }
}
