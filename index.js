// 引用linebot 套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
// 引用 request 套件
import rp from 'request-promise'

// 讀取.env檔
dotenv.config()

// 宣告機器人的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

const delHtmlTag = (str) => {
  return str.replace(/<[^>]+>/g, '')// 去掉所有的html標記
}

// 當收到訊息時
// bot.on('message', event => {
//   if (event.message.type === 'text') {
//     event.reply(event.message.text)
//   }
// })

bot.on('message', async (event) => {
  let msg = ''
  try {
    // const data = await rp({ uri: 'https://kktix.com/events.json', json: true })
    const data = await rp({ uri: 'https://api.hearthstonejson.com/v1/45932/zhTW/cards.collectible.json', json: true })
    for (let i = 0; i <= 2536; i++) {
      if (event.message.text === data[i].name) {
        msg = `花費:${data[i].cost}\n趣味說明: ${data[i].flavor}\n效果:${delHtmlTag(data[i].text)}`
      }
    }
  } catch (error) {
    msg = '發生錯誤'
  }
  event.reply(msg)
})

// 在 port 啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
