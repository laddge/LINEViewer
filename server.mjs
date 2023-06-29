import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080
const app = express()

app.use(cors())
app.use(express.static('dist'))

app.get('/api/list', async (_, res) => {
  const db = await open({
    filename: '/data/data/jp.naver.line.android/databases/naver_line',
    driver: sqlite3.Database
  })
  const chats = await db.all('select chat_id, last_message, last_created_time from chat')

  for (const chat of chats) {
    chat.last_created_time = new Date(parseInt(chat.last_created_time))
    let chat_name = (await db.get(`select name from contacts where m_id = \'${chat.chat_id}\'`))
    if (!chat_name) {
      chat_name = (await db.get(`select name from groups where id = \'${chat.chat_id}\'`))
    }
    chat.chat_name = chat_name ? chat_name.name : '#unknown#'
  }

  res.status(200).json(chats)
})

app.get('/api/chat/:id', async (req, res) => {
  const db = await open({
    filename: '/data/data/jp.naver.line.android/databases/naver_line',
    driver: sqlite3.Database
  })

  const names = {}
  for (const contact of await db.all('select m_id, name from contacts')) {
    names[contact.m_id] = contact.name
  }
  for (const group of await db.all('select id, name from groups')) {
    names[group.id] = group.name
  }

  const chat = {
    name: names[req.params.id] || '#unknown#',
    messages: [],
  }

  const messages = await db.all(`select from_mid, created_time, content from chat_history where chat_id = \'${req.params.id}\'`)
  for (const message of messages) {
    if (message.from_mid) {
      chat.messages.push({
        from_name: names[message.from_mid] || '#unknown#',
        content: message.content,
        created_time: new Date(parseInt(message.created_time))
      })
    } else {
      chat.messages.push({
        content: message.content,
        created_time: new Date(parseInt(message.created_time))
      })
    }
  }

  res.status(200).json(chat)
})

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) console.log('Error in server setup')
  console.log('Server listening on Port', PORT)
})
