require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const ChatGPTService = require('./services/chatgpt.service');

const telegramToken = process.env.TELEGRAM_KEY;

const bot = new TelegramBot(telegramToken, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const chatMsg = msg.text;
    
    ChatGPTService.generateCompletion(chatMsg).then(responseMsg => {
        bot.sendMessage(chatId, responseMsg);
    });
});
