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
  <div class="border-y p-6">
    <div class="flex items-center">
      <div class="grow">
        <RouterLink :to="`/chat/${chat.chat_id}`" class="btn btn-ghost normal-case text-lg">
          {{ chat.chat_name }}
        </RouterLink>
      </div>
      <div class="flex-none">
        {{ format(new Date(chat.last_created_time), 'M/d/yy H:mm') }}
      </div>
    </div>
    <div class="m-2">
      {{ chat.last_message }}
    </div>
  </div>
</template>
