<template>
  <div class="dropdown">
    <!-- Toggle button -->
    <button 
      class="dropdown-toggle" 
      :class="{ open: isOpen }" 
      @click="toggleDropdown"
    >
      {{ label }}
    </button>

    <!-- Dropdown menu -->
    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="(item, index) in localItems" :key="index">
        <a href="#" @click.prevent="selectItem(item)">
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
  label: { type: String, default: "Dropdown" },
  items: { type: Array, default: () => ["Greek (Ελληνικά)",
  "English (English)",
  "Chinese (中文)",
  "Spanish (Español)",
  "Japanese (日本語)",
  "Arabic (العربية)"] }
})

const localItems = ref([...props.items])

watch(
  () => props.items,
  (newItems) => { localItems.value = [...newItems] }
)

const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectItem(item) {
  console.log("Selected:", item)
  isOpen.value = false
}

function handleClickOutside(event) {
  if (!event.target.closest(".dropdown")) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  padding: 8px 12px;
  border: none;            /* remove border */
  background-color: white; /* match header */
  cursor: pointer;
  border-radius: 4px;      /* optional */
  outline: none;            /* remove default focus outline */
  box-shadow: none;         /* remove any shadow that may look like a border */
  transition: background-color 0.2s ease;
  z-index: 1000;
}

/* Optional: hover effect for feedback */
.dropdown-toggle:hover {
  background-color: white;
}

/* Remove focus outline when clicked */
.dropdown-toggle:focus {
  outline: none;
  box-shadow: none;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  width: 160px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 2000;
}

.dropdown-menu li a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
}

.dropdown-menu li a:hover {
  background: #f0f0f0;
}
</style>
