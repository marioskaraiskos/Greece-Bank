<!-- src/forms/RecoverPasswordForm.vue -->
<template>
  <div class="recover-form">
    <h2>Recover Your Password</h2>

    <form @submit.prevent="handleRecover">
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

    <p v-if="message" class="success-message">{{ message }}</p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)

const handleRecover = async () => {
  message.value = ''
  error.value = ''
  loading.value = true

  try {
    const response = await axios.post('http://localhost:5000/api/auth/recover', {
      email: email.value
    })

    message.value = response.data.message
    email.value = ''
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to send recovery email.'
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.recover-form {
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 30%;
  margin: auto;
  margin-top: 50px;
}

.recover-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.recover-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.recover-form input[type="email"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.recover-form button {
  width: 100%;
  padding: 12px;
  background-color: #0070c0;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.recover-form button:disabled {
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
