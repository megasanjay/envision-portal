<script setup lang="ts">

</script>

<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 ">
    <div class="max-w-screen-xl mx-auto py-4 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>

      <div class="flex items-center gap-x-2">
        <AppColorModeButton />

        <UButton
          to="https://github.com/nuxt-ui-pro/saas"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="gray"
          variant="ghost"
        />
      </div>
    </div>
  </footer>
</template>
