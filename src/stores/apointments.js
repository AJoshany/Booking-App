import { defineStore } from "pinia";

export const useApointmentStore = defineStore("apointment", {
  state: () => ({
    allApointments: JSON.parse(localStorage.getItem("allApointments") || "[]"),
  }),
  actions: {
    addApointment(apo) {
      const exist = this.allApointments.find((a) => a.id === apo.id);
      if (!exist) {
        this.allApointments.push(apo);
        this.saveToLocalStorage();
      } else return;
    },
    reserve(id) {
      const apo = this.allApointments.find((a) => a.id === id);
      apo.reserved = !apo.reserved;
      const user = JSON.parse(localStorage.getItem("currentUser")) || {};
      const users = JSON.parse(localStorage.getItem("users"));
      if (!user.apointments) {
        user.apointments = [];
      }
      user.apointments.push(apo);
      localStorage.setItem("currentUser", JSON.stringify(user));
      users.find((u) => u.id === user.id).apointments = user.apointments;
      localStorage.setItem("users", JSON.stringify(users));

      this.saveToLocalStorage();
    },

    getApoWeekDays() {
      let dates = [];
      this.allApointments.map((apo) => {
        const exist = dates.find((d) => d.weekDay === apo.weekDay) || null;
        if (!exist) {
          dates.push({
            weekDay: apo.weekDay,
            date: apo.date,
          });
        }
      });
      return dates || [];
    },

    getApoByWeekDay(apoWeekDay) {
      const apos = this.allApointments.filter((a) => {
        return a.weekDay === apoWeekDay;
      });

      return apos;
    },

    saveToLocalStorage() {
      localStorage.setItem(
        "allApointments",
        JSON.stringify(this.allApointments)
      );
    },
  },
});
