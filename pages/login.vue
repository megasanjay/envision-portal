<template>
  <div class="h-screen  items-center justify-center overlay flex">
    <div class="px-4 py-5 sm:p-6 max-w-sm w-full border rounded-xl">
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
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

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

  await $fetch("/api/auth/login", {
    method: "POST",
    body,
  }).then(async () => {
    await navigateTo("/dashboard");
  }).catch((error) => {
    console.error(error);
  }).finally(() => {
    state.username = "";
    state.password = "";
  });
}
</script>
