<template>
  <div>
    DashBoard
    <button @click="handleLogOut">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "../../stores/users";
import Apointments from "../Apointments/Apointments.vue";

const userStore = useUsersStore();

const router = useRouter();

function handleLogOut() {
  userStore.logOut();
  router.push("/");
}
</script>

<style></style>
