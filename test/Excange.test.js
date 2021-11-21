import { tokens, EVM_REVERT } from './helpers';


const { result } = require('lodash');

const Exchange = artifacts.require("Exchange");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Exchange', ([deployer, feeAccount]) => {
    let exchange
    const feePercent = 10

    beforeEach(async() => {
        // Fetch token from blockchain
        exchange = await Exchange.new(feeAccount, feePercent)
    })
    describe('deployment', () => {
        it('Tracks the fee account', async() => {
            // Read token name here...
            const result = await exchange.feeAccount()
            result.should.equal(feeAccount)
        })

        it('Tracks the fee Percent', async() => {
            // Read token name here...
            const result = await exchange.feePercent()
            result.toString().should.equal(feePercent.toString())
        })

    })


})