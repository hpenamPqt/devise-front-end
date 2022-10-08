import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "http://localhost:3000/";

export const useUsersStore = defineStore("session", {
  state: () => ({
    auth_token: null,
    user: {
      id: null,
      username: null,
      email: null,
    },
  }),
  getters: {
    getAuthToken: (state) => {
      return state.auth_token;
    },
    getUserEmail: (state) => {
      return state.user?.email;
    },
    getUserID: (state) => {
      return state.user?.id;
    },
    isLoggedIn: (state) => {
      const loggedOut =
        state.auth_token == null || state.auth_token == JSON.stringify(null);
      return !loggedOut;
    },
  },
  actions: {
    registerUser(payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}users`, payload)
          .then((response) => {
            //Aqui settearemos la informacion de la respuesta
            this.setUserInfo(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loginuser(payload) {
      new Promise((resolve, reject) => {
        axios
          .post(`${BASE_URL}users/sign_in`, payload)
          .then((response) => {
            //Setting userINfo
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logoutUser() {
      const config = {
        headers: {
          authorization: this.state.auth_token,
        },
      };
      new Promise((resolve, reject) => {
        axios
          .delete(`${BASE_URL}users/sign_out`, config)
          .then(() => {
            //Reset user info
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loginUserWithToken(payload) {
      const config = {
        headers: {
          Authorization: payload.auth_token,
        },
      };
      new Promise((resolve, reject) => {
        axios
          .get(`${BASE_URL}member-data`, config)
          .then((response) => {
            //setUserInfoFromToken
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setUserInfo(response) {
      this.state.user = response.data.user;
      this.state.auth_token = response.headers.authorization;
      axios.defaults.headers.common["Authorization"] =
        response.headers.authorization;
      localStorage.setItem("auth_token", response.headers.authorization);
    },
    setUserInfoFromToken(response) {
      this.state.user = response.dat.user;
      this.state.auth_token = localStorage.getItem("auth_token");
    },
    resetUserInfo() {
      this.state.user = {
        id: null,
        username: null,
        email: null,
      };
      this.state.auth_token = null;
      localStorage.removeItem("auth_token");
      axios.defaults.headers.common["Authorization"] = null;
    },
  },
});
