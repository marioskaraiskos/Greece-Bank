// src/stores/language.js
import { reactive } from 'vue'

export const languageStore = reactive({
  current: 'en', // default language
  translations: {
    en: {
      greeting: 'Hello',
      login: 'Login',
      loginText: 'Login to Your Account',
      register: 'Register',
      password: 'Password',
      Rememberme: 'Remember me',
      Forgotpassword: 'Forgot password?',
      noacc: "Don't have an account? Register",
      loginbutton: 'Login',
    },
    el: {
      greeting: 'Γειά σου',
      login: 'Σύνδεση',
      loginText: 'Σύνδεση στον λογαριασμό σας',
      register: 'Εγγραφή',
      password: 'Κωδικός',
      Rememberme: 'Να με θυμάσαι',
      Forgotpassword: 'Ξεχάσατε τον κωδικό;',
      noacc: 'Δεν έχετε λογαριασμό; Εγγραφή',
      loginbutton: 'Σύνδεση',
    },
    zh: { // Chinese
      greeting: '你好',
      login: '登录',
      loginText: '登录到您的账户',
      register: '注册',
      password: '密码',
      Rememberme: '记住我',
      Forgotpassword: '忘记密码？',
      noacc: '没有账户？注册',
      loginbutton: '登录',
    },
    es: { // Spanish
      greeting: 'Hola',
      login: 'Iniciar sesión',
      loginText: 'Inicia sesión en tu cuenta',
      register: 'Registrarse',
      password: 'Contraseña',
      Rememberme: 'Recuérdame',
      Forgotpassword: '¿Olvidaste tu contraseña?',
      noacc: '¿No tienes una cuenta? Regístrate',
      loginbutton: 'Iniciar sesión',
    },
    ja: { // Japanese
      greeting: 'こんにちは',
      login: 'ログイン',
      loginText: 'アカウントにログイン',
      register: '登録',
      password: 'パスワード',
      Rememberme: 'ログイン状態を保持',
      Forgotpassword: 'パスワードをお忘れですか？',
      noacc: 'アカウントをお持ちでないですか？登録',
      loginbutton: 'ログイン',
    },
    ar: { // Arabic
      greeting: 'مرحبا',
      login: 'تسجيل الدخول',
      loginText: 'تسجيل الدخول إلى حسابك',
      register: 'تسجيل',
      password: 'كلمة المرور',
      Rememberme: 'تذكرني',
      Forgotpassword: 'هل نسيت كلمة المرور؟',
      noacc: 'ليس لديك حساب؟ سجل الآن',
      loginbutton: 'تسجيل الدخول',
    }
  },
  setLanguage(lang) {
    this.current = lang
  },
  t(key) {
    return this.translations[this.current][key] || key
  }
})
