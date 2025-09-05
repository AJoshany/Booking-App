import { defineStore } from "pinia";

export const useApointmentStore = defineStore("apointment", {
  state: () => ({
    allApointments: JSON.parse(localStorage.getItem("allApointments") || "[]"),
  }),
  actions: {
    reserve(index) {
      this.allApointments[index].reserved = true;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem(
        "allApointments",
        JSON.stringify(this.allApointments)
      );
    },
  },
});
