import { defineStore } from "pinia";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users") || "[]"),
  }),

  actions: {
    addUser(user) {
      this.users.push(user);
      this.saveToLocalStorage();
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
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    },
    login(username, password) {
      const user = this.users.find((u) => {
        return u.username === username && u.password === password;
      });
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
});
