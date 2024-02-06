<script>
  import {defineNuxtComponent, useCookie} from "nuxt/app";
  import {useTheme} from 'vuetify'

  export default defineNuxtComponent({
    name: 'ColorThemeSwitch',
    setup() {
      const theme = useTheme()
      const themeCookie = useCookie('app.darkMode')
      if (themeCookie) themeCookie.value = 'light'

      return {
        theme,
        themeCookie
      }
    },
    data() {
      return {
        themes: ['light', 'dark'],
        isUserThemeDark: -1
      }
    },
    mounted() {
      this.isUserThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      this.themeCookie = this.themes[+this.isUserThemeDark]
      this.theme.global.name.value = this.themeCookie
    },
    methods: {
      toggleTheme() {
        this.toggleCookie()
        this.toggleVuetify()
      },
      toggleVuetify() {
        this.theme.global.name.value = this.theme.global.current.value.dark ? 'light' : 'dark'
      },
      toggleCookie() {
        this.themeCookie = this.themeCookie === 'dark' ? 'light' : 'dark'
      }
    },
  })
</script>

<template>
<div>
  <VBtn @click="toggleTheme">toggle theme</VBtn>
</div>
</template>

