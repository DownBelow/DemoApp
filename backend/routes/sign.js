const ethers = require('ethers')
const db = require("./../models");
const User = db.users;

const domain = {
    name: "Downbelow",
    version: "1",
    chainId: 4,
    verifyingContract: "0x7093ed76D3D629B2367c4eCab7e335753896b91A"
}

const types = {
    Downbelow: [
        {name: "account", type: "address"},  
        {name: "amount", type: "uint256"},
        {name: "credit", type: "uint256"},
        {name: "nonce", type: "uint256"},
        {name: "deadline", type: "uint256"}
    ]
}

function getTokenAmount(value) {
    return ethers.utils.parseEther(value.toString());
}

exports.signTransaction = async(req, res) => {
    try {
        if(req.body.wallet == '' || req.body.amount == 0 
        || req.body.amount == '' || req.body.type == '') {
            res.status(403).send({ message: 'Invalid user' });
            return;
        }

        let userInfo = await User.findOne({where: {walletAddress: req.body.wallet}});

        if(!userInfo) {
            res.status(403).send({ message: 'Invalid user' });
            return;
        }

        let amount = parseInt(req.body.amount);
        if(req.body.type == 'withdraw' && amount > credit) {
            res.status(403).send({ message: 'Withdrawal amount exceeds than credit balance' });
            return;
        }

        let {credit, nonce} = userInfo;

        let deadline = 1686913074; //Math.floor(Date.now() / 1000) + 13; 

        const value = {
            account: req.body.wallet,
            amount: getTokenAmount(amount),
            credit: (req.body.type == 'withdraw' ? getTokenAmount(credit) : 0),
            nonce,
            deadline: deadline
        };

        let adminWallet = new ethers.Wallet("b24e63c36d81f9a35f6062aa2b8ff85425f597b0cfa91a69c16ce3f995722b92");
        let signature = await adminWallet._signTypedData(domain, types, value);
        const { r, s, v } = ethers.utils.splitSignature(signature);

        res.status(200).send({ message: 'Success', signature: {v, r, s}, 
                    amount, credit: (req.body.type == 'withdraw' ? credit : 0),
                    deadline: deadline });
    }
    catch(err) {
        console.error("signTransaction err: ", err);
        res.status(403).send({ message: 'Internal sign error' });
    }
}