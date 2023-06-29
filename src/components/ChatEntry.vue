<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { format } from 'date-fns'

  interface Chat {
    chat_id: string
    chat_name: string
    last_message: string
    last_created_time: string
  }

  defineProps<{ chat: Chat }>()
</script>

<template>
  <div class="border-t px-4 py-6">
    <div class="flex items-center gap-2">
      <div class="flex-1 overflow-hidden">
        <RouterLink :to="`/chat/${chat.chat_id}`" class="btn btn-ghost normal-case text-lg font-bold max-w-full">
          <p class="truncate">
          {{ chat.chat_name }}
          </p>
        </RouterLink>
      </div>
      <div class="flex-0">
        {{ format(new Date(chat.last_created_time), 'M/d/yy H:mm') }}
      </div>
    </div>
    <div class="m-2">
      {{ chat.last_message }}
    </div>
  </div>
</template>
