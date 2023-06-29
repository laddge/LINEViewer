<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  interface Chat {
    chat_id: string
    chat_name: string
    last_message: string
    last_created_time: string
  }

  const chats = ref<Chat[]>([])
  onMounted(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER || ''}/api/list`)
      chats.value = res.data.sort((a: Chat, b: Chat) => (new Date(b.last_created_time)).getTime() - (new Date(a.last_created_time)).getTime())
    } catch (err) {
      console.log(err)
    }
  })
</script>

<template>
  <main>
    <ul>
      <li v-for="chat in chats">
        {{ chat.chat_name }}
      </li>
    </ul>
  </main>
</template>
