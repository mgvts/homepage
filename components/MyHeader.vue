<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "MyHeader",
  data() {
    return {
      showPages: false,
      items: [
        {text: 'home', icon:'mdi-home', path:''},
        {text: 'data fetch', icon: 'mdi-database-outline', path: 'dataFetch'},
        {text: 'kitty wall', icon: 'mdi-cat', path: 'cats'},
      ]
    }
  }
})
</script>

<template>
  <VContainer class="ma-2">
    <VAppBar
        density="comfortable"
        flat
    >
      <VAppBarTitle>here title</VAppBarTitle>
      <ColorThemeSwitch class="h-100 mr-1"/>
      <VAppBarNavIcon
          @click="showPages = !showPages"
      />
    </VAppBar>
  </VContainer>
  <VExpandTransition>
    <VList v-show="showPages">
      <VListItem
          v-for="(item, i) in items"
          :key="i"
          :value="item"
      >
        <template v-slot:prepend>
          <VIcon :icon="item.icon"></VIcon>
        </template>
        <NuxtLink :to="'/' + item.path">
          <VListItemTitle>{{ item.text }}</VListItemTitle>
        </NuxtLink>
      </VListItem>
    </VList>
  </VExpandTransition>
  <VContainer v-if="showPages"></VContainer>
</template>

<style scoped lang="css">

</style>