<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() => colorMode.value === "dark" ? "#111827" : "white");

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: "%s - Envision Portal",
  ogImage: "https://kalai.fairdataihub.org/api/generate?title=Envision%20Portal&description=Some%20description%20here%0A&app=Envision%20Portal&org=eyeact",
  twitterImage: "https://kalai.fairdataihub.org/api/generate?title=Envision%20Portal&description=Some%20description%20here%0A&app=Envision%20Portal&org=eyeact",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
