<template>
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
</template>

<script setup>
import "./Apointments.css";
import { computed, onMounted, ref, watch } from "vue";
import { useApointmentStore } from "../../stores/apointments";
import apoList from "./apoList";

const apoStore = useApointmentStore();
let allApointments = ref([]);
allApointments.value = [...apoList];

const weekDays = ref([]);
weekDays.value = apoStore.getApoWeekDays();

const activeWeekDay = ref("Monday");

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
