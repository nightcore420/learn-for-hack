var Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.IpcProvider("/home/geth/mainnet/geth.ipc", net));
var web3 = new Web3(new Web3.providers.HttpProvider("http://142.132.199.225:8888"));
(async () => {
    let found = false
    let txs = []
    while(found == false){
        let blocks = await web3.eth.getBlock('pending')
        await Promise.all(blocks["transactions"].map(async (file) => {
            const txReceipt = await web3.eth.getTransaction(file)
            if(txReceipt == null ){return ;}
            console.log(txReceipt)
            if(txReceipt.input.includes("0x608060")){
                found = true
                txs.push(txReceipt)
            }
          }));
          if(found == true){
              console.log("Found the same methode !!")
              console.log(txs)
              
          }
          
    }

})()
// var array = [3 , 6, 2, 56, 32, 5, 89, 32],
//     largest = array.sort((a,b)=>a-b).reverse()[0];
//     console.log(largest)
