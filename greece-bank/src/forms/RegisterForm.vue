<!-- src/forms/RegisterForm.vue -->
<template>
  <div class="register-form">
    <h2>Create Your Account</h2>

    <form @submit.prevent="handleRegister">
      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" required />

      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required />

      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required />

      <div class="options">
        <label>
          <input type="checkbox" v-model="agreeTerms" />
          I agree to the terms and conditions
        </label>
        <div class="login-link">
          <router-link to="/">Already have an account? Login</router-link>
        </div>
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'  // ✅ import router hook

const router = useRouter()              // ✅ create router instance

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!")
    return
  }

  if (!agreeTerms.value) {
    alert("You must agree to the terms and conditions!")
    return
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    alert(`User ${response.data.username} registered successfully!`)
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    agreeTerms.value = false

    router.push('/') // redirecting to login
  } catch (err) {
    alert(err.response?.data?.error || 'Registration failed.')
  }
}
</script>


<style scoped>
.register-form {
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 30%;
}

.register-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #222;
}

.register-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.register-form input[type="text"],
.register-form input[type="email"],
.register-form input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.register-form .options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.register-form button {
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

.register-form button:hover {
  background-color: #005a99;
}

.login-link a {
  color: #0070c0;
  text-decoration: none;
  font-size: 0.9rem;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
