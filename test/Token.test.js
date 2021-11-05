import { tokens, EVM_REVERT } from './helpers';


const { result } = require('lodash');

const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer, receiver]) => {
    let token
    const name = 'Quant1 Token'
    const symbol = 'QUT'
    const totalSupply = tokens(1000000000000).toString()
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

    describe('Succeeded sending Tokens', () => {
        beforeEach(async() => {
            token = await Token.new()
        })
        let amount
        let result
        beforeEach(async() => {
            amount = tokens(1000)
            result = await token.transfer(receiver, amount, { from: deployer })
        })

        it('Transfer token balances', async() => {
            let receiverBalanceOf = await token.balanceOf(receiver)
            let senderBalanceOf = await token.balanceOf(deployer)

            receiverBalanceOf = await token.balanceOf(receiver)
            senderBalanceOf = await token.balanceOf(deployer)
            senderBalanceOf.toString().should.equal(tokens(999999999000).toString())
            receiverBalanceOf.toString().should.equal(amount.toString())
        })

        it("Emits a transfer event", async() => {
            const log = result.logs[0]
                //console.log(log)
            log.event.should.eq('Transfer')
            const event = log.args
            event.from.toString().should.eq(deployer, "From is correct")
            event.to.toString().should.eq(receiver, "To is correct")
            event.value.toString().should.eq(amount.toString(), "Value is correct")

        })
    })

    describe('Failure sending tokens', async() => {
        let amount
        beforeEach(async() => {
            amount = tokens(1000).toString()
        })
        it('Rejects insufficient balances', async() => {
            let invalidAmount
            invalidAmount = tokens(1000000000000000).toString()
            await token.transfer(receiver, invalidAmount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)
        })

        it('Rejects invalid recipients', async() => {
            await token.transfer(0X0, amount, { from: deployer }).should.be.rejected
        })
    })
})