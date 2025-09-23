<template>
  <div class="user-avatar-container" @mouseleave="open = false">
    <!-- Circle avatar -->
    <div class="avatar-circle" @mouseenter="open = true">
      {{ initials }}
    </div>

    <!-- Dropdown menu -->
    <div v-if="open" class="dropdown-menu">
      <p class="user-email">{{ user.email }}</p>
      <button @click="handleSettings">Settings</button>
      <button @click="handleEditPhoto">Edit Photo</button>
      <button @click="handleLogout">Log Out</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  user: Object
});

const emits = defineEmits(["logout"]);

const open = ref(false);

// Compute initials: first and last letter of email
const initials = computed(() => {
  if (!props.user?.email) return "";
  const e = props.user.email;
  return e[0].toUpperCase() + e[e.indexOf("@") - 1].toUpperCase();
});

// Actions
const handleLogout = () => {
  emits("logout");
};

const handleSettings = () => {
  alert("Open settings page");
};

const handleEditPhoto = () => {
  alert("Open edit profile picture modal");
};
</script>

<style scoped>
.user-avatar-container {
  position: relative;
  display: inline-block;
}

/* Circle avatar */
.avatar-circle {
  width: 40px;
  height: 40px;
  background-color: #0070c0;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  padding: 10px 0;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 180px;
  z-index: 10;
}

.dropdown-menu p.user-email {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0 15px 10px 15px;
  border-bottom: 1px solid #ddd;
}

.dropdown-menu button {
  display: block;
  width: 100%;
  padding: 8px 15px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-menu button:hover {
  background-color: #f0f0f0;
}
</style>
