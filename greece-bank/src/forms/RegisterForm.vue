<template>
  <div>
    <h1>hi</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Remember Me:', rememberMe.value)
}
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
</style>
