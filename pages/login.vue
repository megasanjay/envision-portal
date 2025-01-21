<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { loggedIn } = useUserSession();

if (loggedIn.value) {
  await navigateTo("/dashboard");
}

definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Login",
});

const toast = useToast();
const loading = ref(false);

const schema = z.object({
  username: z.string().min(3, "Must be at least 3 characters"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  username: "test",
  password: "12345678",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const body = {
    username: event.data.username,
    password: event.data.password,
  };

  loading.value = true;

  await $fetch("/api/auth/login", {
    method: "POST",
    body,
  }).then(async () => {
    toast.add({
      id: "login_success",
      icon: "material-symbols:check-circle-outline",
      title: "Login successful",
      description: "You can now access your account",
    });
    await navigateTo("/dashboard");
  }).catch((error) => {
    console.error(error.data);
    toast.add({
      id: "login_error",
      icon: "material-symbols:error",
      color: "red",
      title: "Error logging in",
      description: error.data.statusMessage,
    });
  }).finally(() => {
    loading.value = false;
  });
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="px-4 py-5 sm:p-6 max-w-sm w-full">
      <div class="flex flex-col items-center justify-center ">
        <Icon
          name="iconoir:lock"
          :size="40"
        />

        <h2 class="text-2xl font-bold my-1">
          Welcome back
        </h2>

        <p class="font-medium text-slate-600">
          Don't have an account?
          <NuxtLink
            to="/signup"
            class="text-sky-500 hover:underline font-medium"
          >
            Sign up
          </NuxtLink>
        </p>
      </div>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 mt-6"
        @submit="onSubmit"
      >
        <UFormGroup
          label="Username"
          name="username"
        >
          <UInput
            v-model="state.username"
            type="text"
          />
        </UFormGroup>

        <UFormGroup
          label="Password"
          name="password"
        >
          <template #hint>
            <NuxtLink
              to="/forgot-password"
              class="text-sky-500 hover:underline"
            >
              Forgot your password?
            </NuxtLink>
          </template>

          <UInput
            v-model="state.password"
            type="password"
          />
        </UFormGroup>

        <UButton
          type="submit"
          class="w-full flex justify-center "
          size="md"
          :loading="loading"
          :ui="{ rounded: 'rounded-full' }"
        >
          <template #trailing>
            <UIcon
              name="i-heroicons-arrow-right-20-solid"
              class="w-5 h-5"
            />
          </template>
          Continue
        </UButton>
      </UForm>
    </div>

    <template #footer>
      By signing in, you agree to our <NuxtLink
        to="/"
        class="text-primary font-medium text-sm"
      >Terms of Service</NuxtLink>.
    </template>
  </UCard>
</template>
