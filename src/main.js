import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";


import { useSessionStore } from "@/stores/storeSessions";

/**
 * pinia
 */
const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");

/**
 * storeSessions
 */
const storeSessions = useSessionStore();

/**
 * Load JWT from Local Storage on Refresh
 */
console.log("Loading JWT from Local Storage");
let localAuthToken = localStorage.auth_token;
let cookieExists = localAuthToken !== "undefined" && localAuthToken !== null;
if (cookieExists) {
  const auth_token = localStorage.getItem("auth_token");
  const authTokenExists = auth_token !== "undefinde" && auth_token !== null;
  console.log(`authTokenExists?: ${authTokenExists}`);
  if (authTokenExists) {
    storeSessions.loginUserWithToken({ auth_token });
  }
}
