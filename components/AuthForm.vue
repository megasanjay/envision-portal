<template>
  <form
    class="auth__form"
    @submit.prevent="submit"
  >
    <h1 class="auth__heading">
      {{ title }}
    </h1>

    <div class="auth__div">
      <label
        for="username"
        class="form__label"
      >Username</label>

      <input
        id="username"
        v-model="username"
        type="text"
        name="username"
        required
        class="form__input"
      >
    </div>

    <div class="auth__div">
      <label
        for="password"
        class="form__label"
      >Password</label>

      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        required
        class="form__input"
      >
    </div>

    <button
      class="form__button"
      :disabled="loading"
    >
      <template v-if="loading">
        please wait...
      </template>

      <template v-else>
        {{ title }}
      </template>
    </button>
  </form>
</template>

<script setup>
const username = ref("test");
const password = ref("12345678");

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["submit"]);

const submit = () => {
  const payload = {
    username: username.value,
    password: password.value,
  };
  emit("submit", payload);
};
</script>

<style lang="css" scoped>
.auth__form {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 8px;
}

.auth__div {
  margin-bottom: 30px;
}

.form__label {
  display: block;
  margin-bottom: 4px;
  max-width: 300px;
  box-sizing: border-box;
}

.form__input {
  height: 50px;
  width: calc(100% - 20px);
  padding-left: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.form__button {
  height: 50px;
  border-radius: 8px;
  background-color: #008065;
  color: #fff;
  border: 0;
  width: 100%;
  cursor: pointer;
}
</style>
