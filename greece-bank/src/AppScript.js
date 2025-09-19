import { ref } from 'vue'

export function setupApp() {
  // Reactive array for languages
  const languages = ref(["Greek (Ελληνικά)",
  "English (English)",
  "Chinese (中文)",
  "Spanish (Español)",
  "Japanese (日本語)",
  "Arabic (العربية)"])

  // Example: dynamically add a language after 3s
  setTimeout(() => {
    languages.value.push("Spanish")
  }, 3000)

  return {
    languages
  }
}
