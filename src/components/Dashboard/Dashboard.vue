<template>
  <div class="main">
    <h2>Dashboard</h2>
    <div class="dashboard-main">
      <div class="dashboard__left-side">
        <div class="left-list">
          <span class="active">My AppointMents</span>
          <span>Infos</span>
          <span>Payments</span>
        </div>

        <button @click="handleLogOut" class="logout-btn">Logout</button>
      </div>
      <ul class="myAppointments" v-if="apointments.length > 0">
        <li v-for="apo in apointments" :key="apo.id" class="apo">
          {{ apo.weekDay }}
          <span>{{ apo.time }}</span>
          <button @click="handleRemove(apo)">❌</button>
        </li>
      </ul>
      <div v-else class="dashboard__right-side">
        <p>You have not booked an appointment yet.</p>
      </div>
    </div>
    <RouterLink class="link" to="/appointments">AppointMents ></RouterLink>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "../../stores/users";
import "./Dashboard.css";
import { useApointmentStore } from "../../stores/apointments";
import { computed, onMounted, ref } from "vue";

const userStore = useUsersStore();
const apoStore = useApointmentStore();
const apointments = computed(() => userStore.getUserData().apointments || []);
const router = useRouter();

function handleLogOut() {
  userStore.logOut();
  router.push("/");
}

function handleRemove(apo) {
  userStore.removeApo(apo);
  apoStore.unReserve(apo.id);
}
</script>

<style scoped></style>
