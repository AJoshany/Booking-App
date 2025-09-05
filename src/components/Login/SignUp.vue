<template>
  <div class="login-page">
    <div class="form">
      <Form class="login-form">
        <div class="login-input">
          <Field
            type="text"
            placeholder="username"
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
        <button type="submit" class="submit-btn">Sign Up</button>
        <p class="message">
          Already registered? <RouterLink to="/">Login</RouterLink>
        </p>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import "./Login.css";
import { required } from "@vee-validate/rules";

defineRule("required", required);

const username = ref("");
const password = ref("");
</script>

<style></style>
