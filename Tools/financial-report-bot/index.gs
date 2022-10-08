//CONFIG
var BOT_TOKEN = "1234567890:abcdefghijklmnopqrstuvwxyz" //BOT TOKEN 
var SS_URL = "https://docs.google.com/spreadsheets/d/abcdefghijklmnopq/edit#gid=0" //URL SPREADSHEET
var SHEET_NAME = "report" // SHEET NAME
var USERS = [
	173739838,
	183837728
] //CHAT ID


//BEGIN
var SHEET = SpreadsheetApp.openByUrl(SS_URL).getSheetByName(SHEET_NAME);

function doGet(e) {
	return HtmlService.createHtmlOutput('<h1>OK</h1>')
}

function doPost(e) {
	if (e.postData.type == "application/json") {
		let update = JSON.parse(e.postData.contents);
		if (update) {
			commands(update)
			return true
		}
	}
}

function commands(update) {

	let chatId = update.message.chat.id;
	let first_name = update.message.chat.first_name;
	let text = update.message.text || '';
	let tanggal = new Date().toLocaleString();

	if (USERS.includes(chatId)) {

		if (text.startsWith("/start")) {
			sendMessage({
				chat_id: chatId,
				text: "Start the report by \n/new [price] [#category] [item1, item2 etc.]"
			})
		} else if (text.startsWith("/new")) {
			let item,
				price,
				category,
				stext = text.split(' ')

			price = eval(stext[1]);
			category = stext[2].startsWith('#') ? stext[2].replace('#', '') : '';
			stext.splice(0, 3);
			item = stext.join(' ')


			if (price && category && item) {
				insert_value([
					tanggal,
					category,
					item,
					price,
					chatId,
					first_name
				], SHEET)

				sendMessage({
					chat_id: chatId,
					text: 'Success report.'
				})

			} else {
				sendMessage({
					chat_id: chatId,
					text: 'Fail. Make sure it fits the format. \n/new [price] [#category] [item1, item2 etc]'
				})
			}
		}
	}
}

function sendMessage(postdata) {
	var options = {
		'method': 'post',
		'contentType': 'application/json',
		'payload': JSON.stringify(postdata),
		'muteHttpExceptions': true
	};
	UrlFetchApp.fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', options);
}
