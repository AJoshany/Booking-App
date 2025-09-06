import { defineStore } from "pinia";
import { useUsersStore } from "./users";

export const useApointmentStore = defineStore("apointment", {
  state: () => ({
    allApointments: JSON.parse(localStorage.getItem("allApointments") || "[]"),
    userApointments:
      JSON.parse(localStorage.getItem("currentUser") || "{}").apointments || [],
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
      if (!apo) return;
      apo.reserved = true;

      const userStore = useUsersStore();
      const user = userStore.user;
      const users = userStore.users;

      if (!user.apointments) {
        user.apointments = [];
      }
      if (!user.apointments.find((a) => a.id === apo.id)) {
        user.apointments.push(apo);
      }
      userStore.user = { ...user };
      userStore.saveToLocalStorage();
      localStorage.setItem("currentUser", JSON.stringify(userStore.user));

      this.userApointments = user.apointments;
      this.saveToLocalStorage();
    },
    unReserve(id) {
      const apo = this.allApointments.find((a) => a.id === id);
      if (!apo) return;
      apo.reserved = false;

      const user = userStore.user;
      const users = userStore.users;

      if (user.apointments) {
        user.apointments = user.apointments.filter((a) => a.id !== id);
      }

      localStorage.setItem("currentUser", JSON.stringify(user));

      const userIndex = users.findIndex((a) => a.id === user.id);

      if (userIndex !== -1) {
        users[userIndex].apointments = user.apointments;
      }

      this.userApointments = user.apointments;

      userStore.user = user.apointments;
      userStore.saveToLocalStorage();

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
