import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users") || "[]"),
    user: JSON.parse(localStorage.getItem("currentUser") || "null"),
  }),

  actions: {
    addUser(user) {
      if (!user.apointments) {
        user.apointments = [];
      }
      this.users.push(user);
      this.saveToLocalStorage();
      this.user = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    removeUser(index) {
      this.users.splice(index, 1);
      this.saveToLocalStorage();
    },
    clearUsers() {
      this.users = [];
      this.saveToLocalStorage();
    },
    getUserData() {
      return this.user || {};
    },
    login(username, password) {
      const user = this.users.find((u) => {
        return u.username === username && u.password === password;
      });
      if (user) {
        this.user = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    },
    removeApo(apo) {
      const index = this.user.apointments.findIndex((a) => a.id === apo.id);
      if (index !== -1) {
        this.user.apointments.splice(index, 1);
        const userIndex = this.users.findIndex((u) => u.id === this.user.id);
        if (userIndex !== -1) {
          this.users[userIndex] = this.user;
        }
        localStorage.setItem("currentUser", JSON.stringify(this.user));
        this.saveToLocalStorage();
      }
    },
    logOut() {
      localStorage.removeItem("currentUser");
      this.user = {};
    },
    saveToLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
});
