const puppeteer = require('puppeteer');
const delay = require('delay');
const fs = require ('fs');

//mulai bikin random karakter
function randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

//selesai bikin random karakter

//mulai set variable untuk randomValue
var randomValue = randomString(20);
var randomEmail = randomString(5);
var randomLagi = randomString(5);
//selesai set variable untuk randomValue
const email =  randomValue+randomLagi+'@'+randomEmail+'.com';
const password = "Qwer1234";
(async () =>
{
  
    const browser = await puppeteer.launch({
        headless:true,
        
    });
    try {
    const page = await browser.newPage();

    await page.goto('https://socialbooster.me/r/81c9148b3',{waituntil:'load'})
    
    await delay(1000)
console.log('Buka URL')
    await page.waitForSelector('#app > div.user_referral_wrapper.d-flex.justify-content-center.align-items-center > div > main > div.col-12.col-lg-4.z-index > div.referral-page__register-form > form > div:nth-child(2) > input')
    await delay(100)

    await page.type('#app > div.user_referral_wrapper.d-flex.justify-content-center.align-items-center > div > main > div.col-12.col-lg-4.z-index > div.referral-page__register-form > form > div:nth-child(2) > input',email)
    await delay(100)
console.log('Masukin email ' + email)
    await page.waitForSelector('#app > div.user_referral_wrapper.d-flex.justify-content-center.align-items-center > div > main > div.col-12.col-lg-4.z-index > div.referral-page__register-form > form > div:nth-child(3) > input')
    await delay(100)

    await page.type('#app > div.user_referral_wrapper.d-flex.justify-content-center.align-items-center > div > main > div.col-12.col-lg-4.z-index > div.referral-page__register-form > form > div:nth-child(3) > input',password)
    await delay(100)
console.log('masukin password' + password)
    await page.waitForSelector('#app > div.user_referral_wrapper.d-flex.justify-content-center.align-items-center > div > main > div.col-12.col-lg-4.z-index > div.referral-page__register-form > form > button')
    await delay(100)    

    await page.click('#app > div.user_referral_wrapper.d-flex.justify-content-center.align-items-center > div > main > div.col-12.col-lg-4.z-index > div.referral-page__register-form > form > button')
    await delay(100)
console.log('click regist')
     await page.waitForSelector('#register-modal-step-3 > div > div > div.modal-header.moadl-header__register > div.registration-step__secondary-title')
     await delay(100)    
    console.log('Sukses')
        const MoveData =  `${email} | ${password} \n\n`;
	const MoveResult = fs.appendFileSync('dataresult.txt', MoveData);
    await browser.close()
    
 //await page.waitForSelector('#msg-block > div > ul > li')
}
catch(error){
    console.log('Gagal')
    await browser.close()
}

})
();
