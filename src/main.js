import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import useStoreSessions from "@/stores/storeSessions";

/**
 * storeSessions
 */
const storeSessions = useStoreSessions();

/**
 * Load JWT from Local Storage on Refresh
 */
let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem("auth_token");
  const authTokenExists = auth_token !== "undefinde" && auth_token !== null;
  if (authTokenExists) {
    storeSessions.loginUserWithToken(auth_token);
  }
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
