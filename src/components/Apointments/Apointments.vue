<template>
  <div class="main">
    <h2>Dr.Ernest appointment times</h2>
  <div class="apo-main">
    <ul class="weekDays">
      <li
        v-for="(wd, index) in weekDays"
        :key="index"
        class="day"
        :class="{ active: wd.weekDay === activeWeekDay }"
        @click="changeActiveDay"
      >
        {{ wd.weekDay }}
        <span>{{ wd.date }}</span>
      </li>
    </ul>
    <div class="apoTimes">
      <div
        v-for="apo in apoStore.getApoByWeekDay(activeWeekDay)"
        :key="apo.id"
        class="apoTime"
        :class="{ reserved: apo.reserved }"
      >
        <span>{{ apo.time }}</span>
        <button @click="apoStore.reserve(apo.id)" :disabled="apo.reserved">
          Reserve
        </button>
      </div>
    </div>
  </div>
  <RouterLink to="/dashboard" class="link">Dashboard ></RouterLink>
  </div>
</template>

<script setup>
import "./Apointments.css";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useApointmentStore } from "../../stores/apointments";
import apoList from "./apoList";
import { useRouter } from "vue-router";

const apoStore = useApointmentStore();
let allApointments = ref([]);
const activeWeekDay = ref("Monday");
  allApointments.value = [...apoList];
const weekDays = computed(()=>apoStore.getApoWeekDays()) 

watch(
  allApointments,
  (newVal) => {
    newVal.forEach((apo) => {
      apoStore.addApointment(apo);
    });
  },
  { deep: true, immediate: true }
);

function changeActiveDay(event) {
  activeWeekDay.value = event.currentTarget.innerText.split("\n")[0].trim();
}
</script>

<style></style>
