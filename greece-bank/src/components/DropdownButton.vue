<template>
  <div class="dropdown">
    <!-- Toggle button -->
    <button 
      class="dropdown-toggle" 
      :class="{ open: isOpen }" 
      @click="toggleDropdown"
    >
      {{ currentLanguage }}
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
import { ref, watch, onMounted, onBeforeUnmount, provide } from "vue"

const props = defineProps({
  label: { type: String, default: "Dropdown" },
  items: { 
    type: Array, 
    default: () => [
      "Greek (Ελληνικά)",
      "English (English)",
      "Chinese (中文)",
      "Spanish (Español)",
      "Japanese (日本語)",
      "Arabic (العربية)"
    ] 
  }
})

const localItems = ref([...props.items])
watch(() => props.items, (newItems) => { localItems.value = [...newItems] })

const isOpen = ref(false)

// Reactive current language
const currentLanguage = ref(localItems.value[0]) // default to first language
provide("currentLanguage", currentLanguage) // make it available for other components if needed

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectItem(item) {
  currentLanguage.value = item
  isOpen.value = false

  // Example: change app language dynamically
  document.documentElement.lang = item.split(" ")[0] === "Greek" ? "el" : "en" // simple mapping
  console.log("App language changed to:", item)
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
/* Keep your previous styles */
.dropdown { position: relative; display: inline-block; }
.dropdown-toggle { padding: 8px 12px; border: none; background-color: white; cursor: pointer; border-radius: 4px; outline: none; box-shadow: none; transition: background-color 0.2s ease; z-index: 1000; }
.dropdown-toggle:hover { background-color: white; }
.dropdown-toggle:focus { outline: none; box-shadow: none; }
.dropdown-menu { position: absolute; top: 100%; left: 0; margin-top: 4px; padding: 0; list-style: none; background: white; border: 1px solid #ccc; width: 160px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 2000; }
.dropdown-menu li a { display: block; padding: 8px 12px; text-decoration: none; color: #333; }
.dropdown-menu li a:hover { background: #f0f0f0; }
</style>
