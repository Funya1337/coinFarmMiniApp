const { Telegraf, Markup } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf(process.env.TG_TOKEN);

const keyboard = Markup.inlineKeyboard([
    Markup.button.webApp('test web app', `${process.env.CLIENT_URL}`),
  ])

bot.start((ctx) => ctx.reply('Hello', keyboard))

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = bot;