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
      isUserThemeDark: -1,
      toggledTheme: true
    }
  },
  mounted() {
    this.isUserThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    this.themeCookie = this.themes[+this.isUserThemeDark]
    this.theme.global.name.value = this.themeCookie
  },
  watch: {
    toggledTheme() {
      this.toggleCookie()
      this.toggleVuetify()
    }
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
  <VContainer class="px-0">
    <VSwitch
            inset
             v-model="toggledTheme"
             class="custom-switch"
    ></VSwitch>
    <VBtn @click="toggleTheme">toggle theme</VBtn>
  </VContainer>
</template>

<style>
.v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}
.v-switch__thumb {
  background-color:transparent;
  border: 1px solid red;
}
</style>
