<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { loggedIn, user, clear, fetch } = useUserSession();

console.log(loggedIn.value, user.value);

fetch();
const logout = () => {
  clear();
  navigateTo("/login");
};

const { data, error } = await useFetch("/api/ses");

if (error.value) {
  console.log(error.value);
}

console.log(data.value);
</script>

<template>
  <div>
    <template v-if="loggedIn">
      <p>
        Hi
        {{ user?.username }}
      </p>

      <p @click="logout">
        Log out
      </p>
    </template>

    <p v-else>
      Hi Guest, <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
    </p>
  </div>
</template>
