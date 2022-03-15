const ethers = require('ethers');
const db = require('./models');
const config = require('./config.json');

const sequelize = db.Sequelize;
const User = db.users;
const Transaction = db.transactions;

const downbelowAbi = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_signer","type":"address"},{"internalType":"address","name":"_depositPoolWallet","type":"address"},{"internalType":"address","name":"_withdrawPoolWallet","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"offchainCredits","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"onchainCredits","type":"uint256"},{"indexed":false,"internalType":"bool","name":"canRun","type":"bool"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Checked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAbyssAddress","type":"address"}],"name":"SetAbyssAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOWNBELOW_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"addTrusted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"totalCredits","type":"uint256"},{"internalType":"uint256","name":"dailyPayouts","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"checkTotalCredits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"domainName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCreditTracking","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDepositPoolWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWithdrawPoolWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"removeTrusted","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAbyssAddress","type":"address"}],"name":"setAbyssAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newDepositPool","type":"address"}],"name":"setDepositPoolWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newWithdrawPool","type":"address"}],"name":"setWithdrawPoolWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_creditTracking","type":"uint256"}],"name":"updateCreditTracking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"credit","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0x7093ed76D3D629B2367c4eCab7e335753896b91A';

const webSocketProvider = new ethers.providers.WebSocketProvider(config.provider_url, config.network);
const contract = new ethers.Contract(contractAddress, downbelowAbi, webSocketProvider);

contract.on("Deposit", async (id, from, amount, timestamp, event) => {
    try {
        let _id = id.toBigInt();
        let _wallet = from;
        let _amount = ethers.utils.formatEther( amount );

        console.log(`id: ${_id}, from: ${_wallet}, amount: ${_amount}`);


        let transactInfo = await Transaction.findOne({where: {walletAddress: _wallet, type: 'deposit', eventId: _id}});

        if(transactInfo)
            return;

        let userInfo = await User.findOne({where: {walletAddress: _wallet}});
        if(!userInfo)
            return;

        await User.update(
            { nonce: sequelize.literal('nonce + 1'),
              credit: sequelize.literal(`credit + ${_amount}`)
            },
            { where: { walletAddress: _wallet } }
        );

        await Transaction.create({
            walletAddress: _wallet,
            creditAmount: _amount,
            abyssAmount: amount.toString(),
            prevCredit: userInfo.credit,
            type: 'deposit',
            eventId: _id
        });
    }
    catch(err) {
        console.log("Deposit Err: ", err);
    }
});

contract.on("Withdraw", async (id, to, amount, timestamp, event) => {
    try {
        let _id = id.toBigInt();
        let _wallet = to;
        let _amount = ethers.utils.formatEther( amount );

        console.log(`withdraw=> id: ${_id}, to: ${_wallet}, amount: ${_amount}`);

        let transactInfo = await Transaction.findOne({where: {walletAddress: _wallet, type: 'withdraw', eventId: _id}});        

        if(transactInfo)
            return;

        let userInfo = await User.findOne({where: {walletAddress: _wallet}});
        if(!userInfo)
            return;        

        await User.update(
            { nonce: sequelize.literal('nonce + 1'),
                credit: sequelize.literal(`credit - ${_amount}`)
            },
            { where: { walletAddress: _wallet } }
        );
    
        await Transaction.create({
            walletAddress: _wallet,
            creditAmount: _amount,
            abyssAmount: amount.toString(),
            prevCredit: userInfo.credit,
            type: 'withdraw',
            eventId: _id
        });
    }
    catch(err) {
        console.log("Withdraw Err: ", err);
    }
});
