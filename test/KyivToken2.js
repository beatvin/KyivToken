const KyivToken = artifacts.require('KyivToken');

contract('KyivToken', async (accounts) => {

    let kyivToken = null;

    before(async () => {
        kyivToken = await KyivToken.new({from: accounts[0]});
    });


    it('Sould be an ERC20 implementation', async () => {

        assert.isFunction(kyivToken.totalSupply);
        assert.isFunction(kyivToken.balanceOf);
        assert.isFunction(kyivToken.transfer);
        assert.isFunction(kyivToken.allowance);
        assert.isFunction(kyivToken.approve);
        assert.isFunction(kyivToken.transferFrom);

    });

    it('Check "totalSupply"', async () => {

        const totalSupply = await kyivToken.totalSupply();

        assert(String(totalSupply) === '1000000000000000000000');

    });

    it('Check "balanceOf"', async () => {

        const balanceOf = await kyivToken.balanceOf(accounts[0]);

        assert(String(balanceOf) === '1000000000000000000000');

    });

    it('Check "transfer"', async () => {

        const amountToSend = '10000';

        await kyivToken.transfer(accounts[1], amountToSend);

        const receiverBalance = await kyivToken.balanceOf(accounts[1]);

        assert(String(receiverBalance) == amountToSend);

    });

    it('Check "approve" and "allowance"', async () => {

        const amountToAllow = '20000';

        await kyivToken.approve(accounts[1], amountToAllow);

        const allownceValue = await kyivToken.allowance(accounts[0], accounts[1]);

        assert(String(allownceValue) == amountToAllow);

    });


    it('Check "transferFrom"', async () => {

        const amountToSpend = '9999';

        await kyivToken.transferFrom(accounts[0], accounts[2], amountToSpend, { from: accounts[1] });

        const receiverBalance = await kyivToken.balanceOf(accounts[2]);

        assert(String(receiverBalance) === amountToSpend);

    });


    it('Check public variables', async () => {

        let name = await kyivToken.name();
        let symbol = await kyivToken.symbol();
        let decimals = await kyivToken.decimals();
        assert(name === 'KyivToken');
        assert(symbol === 'KT');
        assert(decimals.toNumber() ===18);

    });




});