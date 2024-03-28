<script lang="ts">
import {defineNuxtComponent, useCookie} from "nuxt/app";
import {useTheme} from 'vuetify'

export default defineNuxtComponent({
  name: 'ColorThemeSwitch',
  setup() {
    const vuetifyTheme = useTheme()
    const themeCookie = useCookie('app.darkMode')
    return {
      vuetifyTheme,
      themeCookie,
    }
  },
  data() {
    return {
      themes: ['light', 'dark'],
      isUserThemeDark: false,
      switchVal: false
    }
  },
  mounted() {
    this.isUserThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    this.themeCookie = this.themes[+(this.isUserThemeDark)]
    this.vuetifyTheme.global.name.value = this.themeCookie
    this.switchVal = !(this.isUserThemeDark)
  },
  watch: {
    switchVal() {
      this.toggleTheme()
    }
  },
  methods: {
    toggleTheme() {
      this.toggleCookie()
      this.toggleVuetify()
    },
    toggleVuetify() {
      this.vuetifyTheme.global.name.value = this.vuetifyTheme.global.current.value.dark
          ? 'light' : 'dark'
    },
    toggleCookie() {
      this.themeCookie = this.themeCookie === 'dark' ? 'light' : 'dark'
    }
  },
})
</script>

<template>
  <VSwitch
      inset
      :ripple="false"
      v-model="switchVal"
      class="custom-switch"
      false-icon="mdi-weather-night"
      true-icon="mdi-weather-sunny"
  ></VSwitch>
</template>

<style>
.v-switch--inset .v-switch__thumb {
  height: 24px;
  width: 24px;
  transform: none;
}

.v-switch__thumb {
  background-color: transparent;
}
</style>
