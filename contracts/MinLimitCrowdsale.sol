pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/crowdsale/validation/IndividuallyCappedCrowdsale.sol";


contract MinLimitCrowdsale is IndividuallyCappedCrowdsale {
    uint256 private _minLimit;

    constructor(uint256 minLimit) public {
        _minLimit = minLimit;
    }

    function minLimit() public view returns (uint256) {
        return _minLimit;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(getContribution(beneficiary).add(weiAmount) >= _minLimit);
    }
}
