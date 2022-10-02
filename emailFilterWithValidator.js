const inquirer = require('inquirer');
const emailCheck = require('email-validator');
const fs = require('fs');

const questions = [{
    type: 'input',
    name: 'name',
    message: 'Add email Path:'
}]

inquirer.prompt(questions)
    .then((result) => {
        const datas = fs.readFileSync(result['name'], 'utf-8');
        const removeDuplicatedLines = text => [...new Set(text.split(/\r\n|\n\r|\n|\r/g))].join('\n');
        const dataRemove = removeDuplicatedLines(datas);
        for (let i = 0; i <= dataRemove.split('\n').length; i++) {
            var cek = emailCheck.validate(dataRemove.split('\n')[i]) === true
            if (cek) {
                var date = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
                fs.appendFile(`./output/emailValidAt ${date}.txt`, dataRemove.split('\n').sort()[i] + '\n', function(err) {
                    if (err) throw err
                    return
                })
                // console.log(dataRemove.split('\n')[i] + ' ok')
            } else {
                console.log(`${dataRemove.split('\n')[i]} => tidak valid`)
            }
            // console.log(emailCheck.validate(dataRemove.split('\n')[i]))
        }
    }).catch((err) => {
        console.log(err)
    });
