// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxt/eslint", "nuxt-auth-utils"],
  devtools: { enabled: true },
  compatibilityDate: "2025-01-16",
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
        braceStyle: "1tbs",
      },
    },
  },
});
