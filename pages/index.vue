<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "Main",
  data() {
    return {
      showPages: false,
      pages: [
        { text: 'data fetch', icon: ''}
      ]
    }
  },
})
</script>

<template>
  <VContainer>
    <!--  todo replace all MyHeader into theme/some wrapper -->
    <MyHeader class="ma-2"/>
  </VContainer>
</template>

<style scoped lang="css">

</style>