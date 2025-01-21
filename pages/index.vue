<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <h1>Welcome to Nuxt UI Starter</h1>

          <ColorScheme>
            <USelect
              v-model="$colorMode.preference"
              :options="['system', 'light', 'dark']"
            />
          </ColorScheme>
        </div>
      </template>

      <UButton
        icon="i-heroicons-book-open"
        to="https://ui.nuxt.com"
        target="_blank"
      >
        Open Nuxt UI Documentation
      </UButton>

      <UButton
        class="ml-2"
        to="/dashboard"
        icon="i-heroicons-user"
      >
        Dashboard
      </UButton>
    </UCard>
  </UContainer>
</template>
