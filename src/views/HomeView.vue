<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import ChatEntry from '@/components/ChatEntry.vue'
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
  <header>
    <div class="navbar">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">LINE Viewer</RouterLink>
    </div>
  </header>
  <main>
    <ul>
      <li v-for="chat in chats" class="mx-4">
        <ChatEntry :chat="chat" />
      </li>
    </ul>
  </main>
</template>
