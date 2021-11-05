const { result } = require('lodash');

const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer, receiver]) => {
    let token
    const name = 'Quant1 Token'
    const symbol = 'QUT'
    const totalSupply = "1000000000000000000000000000000"
    const decimals = "18"
    beforeEach(async() => {
        // Fetch token from blockchain
        token = await Token.new()
    })
    describe('deployment', () => {
        it('track the name', async() => {
            // Read token name here...
            const result = await token.name()
            result.should.equal(name)
                // The token name is Quant1
        })

        it('Tracks the symbols', async() => {
            const result = await token.symbol()
            result.should.equal(symbol)
        })

        it('Track the decimals', async() => {
            const result = await token.decimals()
            result.toString().should.equal(decimals)

        })

        it('Track the total supply', async() => {
            const result = await token.totalSupply()
            result.toString().should.equal(totalSupply)
        })

        it('Check Balance', async() => {
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply)
        })
    })

    describe('Sending Tokens', () => {
        it('Transfer token balances', async() => {
            let receiverBalanceOf = await token.balanceOf(receiver)
            let senderBalanceOf = await token.balanceOf(deployer)
            console.log("####  Balance Before the transaction: ####")
            console.log("Receiver balance", receiverBalanceOf.toString())
            console.log("Sender balance", senderBalanceOf.toString())

            await token.transfer(receiver, 1000)

            receiverBalanceOf = await token.balanceOf(receiver)
            senderBalanceOf = await token.balanceOf(deployer)
            console.log("####  Balance After the transaction: ####")
            console.log("Receiver balance", receiverBalanceOf.toString())
            console.log("Sender balance", senderBalanceOf.toString())
        })
    })
})