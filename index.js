const TelegramBot = require('node-telegram-bot-api');
const webAppUrl = 'https://vercel.com';

token = '6275988545:AAGw1xaOVyIaM17YkV2teXC5BBNlZswSuas'

const bot = new TelegramBot(token, {polling: true});
bot.on("pollying_error", err => console.log(err.date.error.message));
// works only in grammy
// bot.api.setMyCommands([
//   {command: "start", description: "Начать"},
//   {command: "link", description: "Ссылка"}
// ])
// bot.on('text', async msg => {
//     console.log(msg)
// })


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

//function to get words after start message that are hidden after 
//connection via referall link with parameters 
bot.onText(/\/start (\w+)/, function (msg, match) {
	// console.log(msg)
	console.log(match)
})


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if(text === '/start' && msg.chat.type === 'private') {
    await bot.sendMessage(chatId, 'Ниже появится кнопка, зайди в ЛК', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Перейти в ЛК', web_app: {url: webAppUrl}}]
            ]
        }
    })
  } else if (text === '/link') {
    await bot.sendMessage(chatId, 'Перейти по ссылке https://t.me/SalonReservationBot?start=payload', {
        // 
    })
  } else if (text === '/start' && msg.chat.type === 'group') {
    await bot.sendMessage(chatId, 'Проследуйте по ссылке на бот', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Ознакомиться с ботом', url: 'https://t.me/SalonReservationBot?start=from_group'}]
        ]
      }
    })
  }


  // send a message to the chat acknowledging receipt of their message
  console.log(msg)
  console.log('\n ------------------------------------------------')
//   bot.sendMessage(chatId, 'Received your message');
});
