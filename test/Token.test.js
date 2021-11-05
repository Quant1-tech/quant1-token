import { tokens } from './helpers';


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

    describe('Sending Tokens', () => {
        beforeEach(async() => {
            token = await Token.new()
        })

        it('Transfer token balances', async() => {
            let receiverBalanceOf = await token.balanceOf(receiver)
            let senderBalanceOf = await token.balanceOf(deployer)

            await token.transfer(receiver, tokens(1000), { from: deployer })

            receiverBalanceOf = await token.balanceOf(receiver)
            senderBalanceOf = await token.balanceOf(deployer)
            senderBalanceOf.toString().should.equal(tokens(999999999000).toString())
            receiverBalanceOf.toString().should.equal(tokens(1000).toString())

        })
    })
})