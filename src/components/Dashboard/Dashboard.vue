<template>
  <div class="main">
    <h2>Dashboard</h2>
  <div class="dashboard-main">
    <div>
      <button @click="handleLogOut">Logout</button>

    </div>
    <ul class="myAppointments">
      <li v-for="apo in apointments" :key="apo.id" class="apo">
        {{ apo.weekDay }}
        <span>{{  apo.time  }}</span>
        <button @click="handleRemove(apo)">❌</button>
      </li>
    </ul>

  </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "../../stores/users";
import "./Dashboard.css"
import { useApointmentStore } from "../../stores/apointments";
import { computed, onMounted, ref } from "vue";

const userStore = useUsersStore();
const apoStore = useApointmentStore();
const apointments = computed(()=>userStore.user.apointments)
console.log(apointments)
const router = useRouter();

function handleLogOut() {
  userStore.logOut();
  router.push("/");
}

// function removeApo(apo){
//   const index =user.apointments.indexOf((a)=>a === apo)
//   user.apointments.splice(index , 1)
//   console.log(user)
// }

function handleRemove(apo){
  userStore.removeApo(apo)
  apoStore.unReserve(apo.id)
}
</script>

<style></style>
