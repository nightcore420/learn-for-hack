import chalk from 'chalk';
import readline from 'readline';
import axios from 'axios';

const eror = chalk.bold.red;
const ijo = chalk.bold.green;
const cyan = chalk.bold.cyan;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(cyan(``));
console.log(cyan(`Aptos Devnet Auto Claim Faucet`));
console.log(cyan(`by Zexalryz`));
console.log(cyan(``));
console.log(cyan(``));

rl.question(chalk.bold.cyan('Paste your APTOS Address : '), (answer) => {
    
    function faucet() {
        console.log(cyan(`Address : ${answer}`));
    const config = {
			method: 'post',
			url: 'https://faucet.devnet.aptoslabs.com/mint',
			params: {
      amount: '1000000',
      address: (answer) ,
      return_txns: true,
  },
			headers: { },
};

axios(config)
.then((response) => {
			// console.log(JSON.stringify(response.data));
			console.log(ijo(`Success Claim 1.000.00 $APT`));
})
.catch((error) => {
            console.log(eror('Error Bad Response / Wrong Address type'));
            
});
        
    }
  // TODO: Log the answer in a database
  
  setInterval(faucet, 2000);
});