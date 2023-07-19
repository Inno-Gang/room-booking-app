<script setup lang="ts">
import { FormRules, FormInst } from "naive-ui";

const router = useRouter();
const authStore = useAuthStore();
const authApi = useAuthApi();
const message = useMessage();

authStore.$subscribe(
  () => {
    if (!authStore.error && authStore.loggedIn) {
      router.replace("/");
    }
  },
  { immediate: true }
);

const formValue = ref({
  email: "",
  password: "",
});

const rules: FormRules = {
  email: {
    trigger: "input",
    required: true,
  },
  password: {
    trigger: "input",
    required: true,
  },
};

const formRef = ref<FormInst | null>(null);

function handleSubmit() {
  formRef?.value?.validate((errors) => {
    if (!errors) {
      authStore.loginStarted();
      authApi.value
        .signup({
          demoUserData: {
            email: formValue.value.email,
            password: formValue.value.password,
          },
        })
        .then((resp) => {
          if (typeof resp !== "string") {
            message.error("Invalid response format");
            authStore.loginError("Invalid response format");
            return;
          }
          authStore.loginSuccess(resp);
        })
        .catch((err) => {
          message.error("Invalid credentials");
          formValue.value.password = "";
          authStore.loginError(`${err}`);
        });
    }
  });
}
</script>

<template>
  <main class="login-page">
    <NCard title="Welcome to the new booking!" class="login-page__card">
      <NForm
        @submit.prevent="handleSubmit"
        :model="formValue"
        :rules="rules"
        ref="formRef"
      >
        <NFormItem label="Email" path="email">
          <NInput
            autofocus
            tabindex="1"
            :input-props="{
              type: 'email',
            }"
            placeholder="some-fake@email.com"
            v-model:value="formValue.email"
            :disabled="authStore.loading"
          />
        </NFormItem>
        <NFormItem label="Password" path="password">
          <NInput
            :input-props="{
              type: 'password',
            }"
            tabindex="2"
            placeholder="Enter demo password"
            v-model:value="formValue.password"
            :disabled="authStore.loading"
          />
        </NFormItem>
        <NButton
          tabindex="3"
          type="primary"
          attr-type="submit"
          :disabled="authStore.loading"
          :loading="authStore.loading"
        >
          Login
        </NButton>
      </NForm>
    </NCard>
  </main>
</template>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__card {
    max-width: 400px;
  }
}
</style>
