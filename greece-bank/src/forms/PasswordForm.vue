<!-- src/forms/PasswordForm.vue -->
<template>
  <div class="password-form">
    <h2>{{ isResetMode ? "Reset Your Password" : "Recover Your Password" }}</h2>

    <!-- Recover Password -->
    <form v-if="!isResetMode" @submit.prevent="handleRecover">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Enter your email"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Sending..." : "Send Recovery Email" }}
      </button>
    </form>

    <!-- Reset Password -->
    <form v-else @submit.prevent="handleReset">
      <label for="newPassword">New Password</label>
      <input
        type="password"
        id="newPassword"
        v-model="newPassword"
        placeholder="Enter new password"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Resetting..." : "Reset Password" }}
      </button>
    </form>

    <!-- Messages -->
    <p v-if="message" class="success-message">{{ message }}</p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"

const route = useRoute()

// Reactive state
const email = ref("")
const newPassword = ref("")
const message = ref("")
const error = ref("")
const loading = ref(false)

// Check if we’re in reset mode (token + email present in URL)
const token = route.query.token
const queryEmail = route.query.email
const isResetMode = computed(() => token && queryEmail)

// -------- Recover --------
const handleRecover = async () => {
  message.value = ""
  error.value = ""
  loading.value = true

  try {
    const res = await axios.post("http://localhost:5000/api/auth/recover", {
      email: email.value,
    })
    message.value = res.data.message
    email.value = ""
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to send recovery email."
  } finally {
    loading.value = false
  }
}

// -------- Reset --------
const handleReset = async () => {
  message.value = ""
  error.value = ""
  loading.value = true

  try {
    const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
      token,
      email: queryEmail,
      newPassword: newPassword.value,
    })
    message.value = res.data.message
    newPassword.value = ""
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to reset password."
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.password-form {
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 30%;
  margin: auto;
  margin-top: 50px;
}

.password-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.password-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.password-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.password-form button {
  width: 100%;
  padding: 12px;
  background-color: #0070c0;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.password-form button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 15px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>
