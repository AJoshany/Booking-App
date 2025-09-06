<template>
  <div class="login-page">
    <div class="form">
      <Form class="login-form" @submit="handleSubmit">
        <div class="login-input">
          <Field
            type="email"
            placeholder="email"
            name="username"
            rules="required"
            v-model="username"
          />
          <ErrorMessage class="error" name="username" />
        </div>

        <div class="login-input">
          <Field
            type="password"
            placeholder="password"
            name="pass"
            rules="required"
            v-model="password"
          />
          <ErrorMessage name="pass" class="error" />
        </div>
        <button type="submit" class="submit-btn">login</button>
        <p class="message">
          Not registered?
          <RouterLink to="/signup">Create an account</RouterLink>
        </p>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import "./Login.css";
import { required } from "@vee-validate/rules";
import { ref } from "vue";
import { useUsersStore } from "../../stores/users";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");

const usersStore = useUsersStore();

const router = useRouter();

function handleSubmit() {
  const loginResult = usersStore.login(username.value, password.value);
  if (loginResult) {
    alert("login successfully");
    router.push("/appointments");
  } else {
    alert("Invalid User Data");
  }
}

defineRule("required", required);
</script>

<style></style>
