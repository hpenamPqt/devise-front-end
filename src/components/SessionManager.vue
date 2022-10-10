<template>
  <div class="container">
    <h1 class="sm-title">Vue Session Manager</h1>

    <div class="sm-card">
      <div v-if="sessionStore.isLoggedIn">
        <button @click="sessionStore.logoutUser" class="logout-button">
          Logout
        </button>
        <table class="table">
          <thead class="thead-dark">
            <tr class="table-headers">
              <th scope="col" style="width: 75px">ID</th>
              <th scope="col">email</th>
              <th scope="col">Token</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-rows">
              <th class="table-row">[{{ sessionStore.getUserID }}]</th>
              <th class="table-row table-row-username">
                [{{ sessionStore.getUserEmail }}]
              </th>
              <th class="table-row">[{{ sessionStore.getAuthToken }}]</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div v-if="!login_signup">
          <h3>Sign Up!</h3>
          <form @submit.prevent="onSignUp" class="sign-up-form">
            <input
              type="email"
              class="sign-up-form-email"
              v-model="signUpEmail"
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              class="sign-up-form-password"
              v-model="signUpPassword"
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Sign up" class="sign-up-form-submit" />
            <button
              @click.prevent="login_signup = true"
              style="margin-left: 5px"
            >
              ¿Ya tienes una cuenta?
            </button>
          </form>
        </div>
        <div v-else>
          <h3>Login!</h3>
          <form @submit.prevent="onLogin" class="sign-up-form">
            <input
              type="email"
              class="login-form-email"
              v-model="loginEmail"
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              class="login-form-password"
              v-model="loginPassword"
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Login" class="login-form-submit" />
            <button
              @click.prevent="login_signup = false"
              style="margin-left: 5px"
            >
              ¿No tienes cuenta?
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * imports
 */
import { useSessionStore } from "@/stores/storeSessions";
import { ref } from "vue";

/**
 * storeSessions
 */
const sessionStore = useSessionStore();

const signUpEmail = ref("hpenam@uaemex.mx");
const signUpPassword = ref("123456");
const loginEmail = ref("");
const loginPassword = ref("");

const login_signup = ref(true);

const onSignUp = () => {
  let payload = {
    user: {
      email: signUpEmail.value,
      password: signUpPassword.value,
    },
  };
  sessionStore.registerUser(payload);
  resetData();
};
const onLogin = () => {
  let data = {
    user: {
      email: loginEmail.value,
      password: loginPassword.value,
    },
  };
  sessionStore.loginUser(data);
  resetData();
};

const resetData = () => {
  signUpEmail.value = "";
  signUpPassword.value = "";
  loginEmail.value = "";
  loginPassword.value = "";
};
</script>

<style scoped>
.sm-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  font-family: "Roboto", sans-serif;
}
.container {
  width: 95%;
  margin: 0 auto;
}
.sm-card {
  width: 90%;
  padding: 20px;
  margin: 0 auto;
  height: 25em;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}
.sign-up-form {
  width: 100%;
}
.sign-up-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.sign-up-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.sign-up-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}
.login-form {
  width: 100%;
}
.login-form-email {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-password {
  width: 55%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.login-form-submit {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.login-form-submit:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}
.logout-button {
  width: 15%;
  padding: 1em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #1a77ce;
  color: #fff;
  border: none;
}
.logout-button:hover {
  background-color: #0d5c8a;
  cursor: pointer;
}
.table-headers {
  background-color: #2b3b49;
  color: #fff;
  max-width: 90%;
  margin: 0 auto;
}
.table-rows {
  background-color: #f2f2f2;
  margin: 0 auto;
}
.table-row {
  word-break: break-all;
  text-align: center;
  padding: 10px;
}
.table-row-username {
  width: 30%;
}
</style>
