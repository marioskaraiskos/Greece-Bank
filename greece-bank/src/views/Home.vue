<!-- src/views/Home.vue -->
<template>
  <div class="hero">
    <RouterLink to="/" class="reload-button">
      <p>GREECE BANK</p>
      <img :src="logo" alt="Logo" class="logo" />
    </RouterLink>

    <!-- Dropdown component -->
    <div class="language">
      <DropdownButton
        label="Language"
        :items="languages"
      />
    </div>
  </div>

  <div class="app-content flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
    <!-- Text Section -->
    <div class="text-container text-center md:text-left md:w-1/2">
      <h1 class="text text-white text-4xl md:text-5xl font-bold">
        GREECE Web App <br />
        An app ready for anything
      </h1>
    </div>

    <!-- LoginForm Component -->
    <div class="login-container md:w-1/2">
      <LoginForm />
    </div>
  </div>
</template>

<script setup>
import logo from '../assets/logo.png'
import DropdownButton from '../components/DropdownButton.vue'
import LoginForm from '../forms/LoginForm.vue'
import { setupApp } from '../AppScript.js'

// Setup the reactive state
const { languages } = setupApp()
</script>

<style src="../AppStyle.css" scoped></style>
