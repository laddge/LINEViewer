<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { useRoute, RouterLink } from 'vue-router'
  import { format } from 'date-fns'
  import axios from 'axios'

  interface Message {
    from_name?: string
    content: string
    created_time: string
  }

  const view = ref<any>(null)
  watch(view, (newVal, _) => {
    newVal?.scrollIntoView(false)
  })

  const route = useRoute()
  const chat = ref<{ name: string, messages: Message[] }>()
  onMounted(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER || ''}/api/chat/${route.params.id}`)
      chat.value = res.data
    } catch (err) {
      console.log(err)
    }
  })
</script>

<template>
  <header class="sticky top-0 z-20">
    <div class="navbar bg-base-100">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">&lt;</RouterLink>
      <div class="overflow-hidden text-xl font-bold">
        <p class="truncate">
          {{ chat ? chat.name : '' }}
        </p>
      </div>
    </div>
  </header>
  <div v-if="!chat" class="h-screen flex justify-center items-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
  <div ref="view" v-else class="mx-2 overflow-hidden">
    <div v-for="message in chat.messages.sort((a, b) => (new Date(a.created_time)).getTime() - (new Date(b.created_time)).getTime())">
      <div v-if="message.content" :class="`chat ${message.from_name ? 'chat-start' : 'chat-end'}`">
        <div class="chat-header">
          {{ message.from_name || '' }}
        </div>
        <div :class="`chat-bubble ${message.from_name ? '' : 'chat-bubble-accent'}`">{{ message.content }}</div>
        <div class="chat-footer opacity-50">
          {{ format(new Date(message.created_time), 'M/d/yy H:mm') }}
        </div>
      </div>
    </div>
  </div>
</template>
