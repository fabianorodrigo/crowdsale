const { time } = require('openzeppelin-test-helpers');

const AtlantisToken = artifacts.require('AtlantisToken');
const AtlantisCrowdsale = artifacts.require('AtlantisCrowdsale');

contract('AtlantisCrowdsale', function ([_, wallet, addr1, addr2]) {
    beforeEach(async function () {
        this.startTime = (await time.latest()).add(time.duration.days(1));
        this.endTime = this.startTime.add(time.duration.days(8));

        this.token = await AtlantisToken.new();
        this.crowdsale = await AtlantisCrowdsale.new(
            10000, // uint256 rate
            wallet, // address payable wallet
            this.token.address, // IERC20 token
            web3.utils.toWei('1000'), // uint256 hardcap
            this.startTime, // uint256 openingTime
            this.endTime, // uint256 closingTime
            web3.utils.toWei('1') // uint256 minLimit
        );
        await this.token.transfer(this.crowdsale.address, web3.utils.toWei('10000000'));
    });

    it('should work for investors', async function () {
        time.increaseTo(this.startTime);
        await this.crowdsale.send(web3.utils.toWei('1'), { from: addr1 });

        (await this.token.balanceOf(addr1)).should.be.bignumber.equal(web3.utils.toWei('10000'));
    });
});
