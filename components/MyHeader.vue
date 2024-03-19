<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'

export default defineNuxtComponent({
  name: "MyHeader",
  data() {
    return {
      showPages: false,
      items:[
        {text: 'data fetch', icon: 'mdi-database-outline', path:'dataFetch'},
        {text: 'kitty wall', icon: 'mdi-cat', path:''},
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
        <VListItemTitle>
          <NuxtLink :to="'/' + item.path">{{ item.text }}</NuxtLink>
        </VListItemTitle>
      </VListItem>
    </VList>
  </VExpandTransition>
  <VContainer v-if="showPages">

  </VContainer>
</template>

<style scoped lang="css">

</style>