// Подключаем необходимые модули
const Telegraf = require('telegraf');
const request = require('request');
const util = require('util');
var config = require('./config.json');

// Создаем объект бота
const bot = new Telegraf(config.token)
.use((ctx) => { // вешаем прослушку
    console.log(util.inspect(ctx.update, false, null, true /* enable colors */))
    // при событии отправляем обновление на наш обработчик
    request({ 
            url: config.webhook,
            method: config.method,
            headers: config.headers,
            json: ctx.update
    });
}).launch(); // запускаем прослушку событий