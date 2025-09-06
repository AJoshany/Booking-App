<template>
  <div>
    <ul class="weekDays">
      <li v-for="(wd, index) in weekDays" :key="index">
        {{ wd }}
      </li>
    </ul>
    <div class="apoTimes">
      <div
        v-for="apo in apoStore.getApoByWeekDay(activeWeekDay)"
        :key="apo.id"
        class="apoTime"
      >
        <span>{{ apo.time }}</span>
        <button v-if="!apo.reserved" @click="apoStore.reserve(apo.id)">
          Reserve
        </button>
        <button v-else disabled>Reserved</button>
      </div>
    </div>
  </div>
</template>

<script setup>
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
</script>

<style></style>
