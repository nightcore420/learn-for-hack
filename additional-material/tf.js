    async trf(amount,address){
        var txParams = {
            gas: this.web3.utils.toHex(1500000),
            gasPrice: this.web3.utils.toHex(this.web3.utils.toWei(process.env.GWEI, 'gwei')),
            value: this.web3.utils.toHex(this.web3.utils.toWei(`${amount}`, "ether")),
            to: address
        };
        const signedTx = await this.userWallet.signTransaction(txParams)
        const txn = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        console.log("Send: "+ amount + " To: "+ address + " "+ "Tx: "+txn.transactionHash)
    }
