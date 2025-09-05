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
          />
          <ErrorMessage class="error" name="username" />
        </div>

        <div class="login-input">
          <Field
            type="password"
            placeholder="password"
            name="pass"
            rules="required"
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

defineRule("required", required);
</script>

<style></style>
