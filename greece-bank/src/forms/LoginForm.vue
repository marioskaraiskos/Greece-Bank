<template>
  <div class="login-form">
    <h2>{{ languageStore.t('loginText') }}</h2>

    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <select v-model="currentLang" @change="changeLanguage">
      <option value="en">English</option>
      <option value="el">Greek</option>
      <option value="zh">Chinese</option>
      <option value="es">Spanish</option>
      <option value="ja">Japanese</option>
      <option value="ar">Arabic</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { languageStore } from '../stores/language.js'

const email = ref('')
const password = ref('')
const currentLang = ref(languageStore.current)

const handleLogin = () => {
  alert(`Login with ${email.value} / ${password.value}`)
}

const changeLanguage = () => {
  languageStore.setLanguage(currentLang.value)
}

// Optional: watch store change to sync dropdown
watch(() => languageStore.current, (newVal) => {
  currentLang.value = newVal
})
</script>



<style scoped>
.login-form {
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.login-form {
    width: 30%;
}

.login-form h2 {
  text-align: center; 
  margin-bottom: 20px;
  color: #222;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.forgotpasswordregister {
    display: flex;
    flex-direction: column;
}

.login-form input[type="email"],
.login-form input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.login-form .options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.login-form button {
  width: 100%;
  padding: 12px;
  background-color: #0070c0;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-form button:hover {
  background-color: #005a99;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.remember-me {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.forgot-password-register {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  gap: 5px;
}

.recover-link, .register-link {
  color: #0070c0;
  text-decoration: none;
}

.recover-link:hover, .register-link:hover {
  text-decoration: underline;
}

</style>
