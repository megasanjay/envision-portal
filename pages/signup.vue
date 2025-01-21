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
  name: z.string().min(3, "Must be at least 3 characters"),
  username: z.string().min(3, "Must be at least 3 characters"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: "Alessandra",
  username: "test",
  password: "12345678",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const body = {
    name: event.data.name,
    username: event.data.username,
    password: event.data.password,
  };

  loading.value = true;

  await $fetch("/api/auth/signup", {
    method: "POST",
    body,
  }).then(async () => {
    toast.add({
      id: "signup_success",
      icon: "material-symbols:check-circle-outline",
      title: "Account created successfully",
      description: "You can now login",
    });
    await navigateTo("/login");
  }).catch((error) => {
    console.error(error.data);
    toast.add({
      id: "signup_error",
      icon: "material-symbols:error",
      color: "red",
      title: "Error creating account",
      description: error.data.statusMessage,
    });
  }).finally(() => {
    loading.value = false;
  });
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <div class="px-4 py-5 sm:p-6 max-w-sm w-full ">
      <div class="flex flex-col items-center justify-center ">
        <h2 class="text-2xl font-bold my-1">
          Create an account
        </h2>

        <p class="font-medium text-slate-600">
          Already have an account?
          <NuxtLink
            to="/login"
            class="text-sky-500 hover:underline font-medium"
          >
            Login
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
          label="Name"
          name="name"
        >
          <UInput
            v-model="state.name"
            type="text"
          />
        </UFormGroup>

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
          <template #trailing>
            <Icon
              name="solar:eye-linear"
              size="16"
            />
          </template>

          <UInput
            v-model="state.password"
            type="password"
          />
        </UFormGroup>

        <UButton
          type="submit"
          class="w-full flex justify-center "
          :loading="loading"
        >
          Create account
        </UButton>
      </UForm>
    </div>

    <template #footer>
      By signing in, you agree to our <NuxtLink
        to="/"
        class="text-primary font-medium "
      > Terms of Service </NuxtLink>.
    </template>
  </UCard>
</template>
