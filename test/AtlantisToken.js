const AtlantisToken = artifacts.require('AtlantisToken');

contract('AtlantisToken', function ([addr1]) {
    describe('Constructor', async function () {
        it('should be ok', async function () {
            this.token = await AtlantisToken.new();
        });
    });
});
