<script lang="ts">
import {defineNuxtComponent} from 'nuxt/app'
import {beginCatImgs, type CatPic} from "./util";

export default defineNuxtComponent({
  data() {
    return {
      catsImgs: [] as CatPic[],
      errorMsg: null as string | null
    }
  },
  methods: {
    async fetchImage(height = 300, width = 300) {
      return await fetch(`https://cataas.com/cat?type=small`)
          .then(res => {
            if (res.ok) return res.blob()
            this.errorMsg = res.statusText
            throw Error
          })
          .then(blob => {
            if (!blob) this.errorMsg = `blob is not Blob but ${blob}`
            else return {
              height,
              width,
              srcImg: URL.createObjectURL(blob)
            }
          })
          .catch(err => {
            console.error(err)
          })
    },
    // @ts-ignore `done` prop are becomes from module:@vue/runtime-core.GlobalComponents.VInfiniteScroll
    load({done}) {
      // done('loading')
      this.fetchImage()
          .then(img => {
            if (img && !this.errorMsg) {
              this.catsImgs.push(img)
              done('ok')
            } else done('error')
          })
          .catch(err => {
            this.errorMsg = err
            done('error')
          })
    },
  },
  mounted() {
    this.catsImgs.push(...beginCatImgs)
  }
})
</script>

<template>
  <MyHeader/>
  <VCardTitle>
    Here some Cats Pics
  </VCardTitle>
  <VInfiniteScroll
      @load="load"
  >
    <div class="d-flex flex-wrap overflow-hidden">
      <template v-for="item in catsImgs" :key="item.srcImg">
        <div style="height: 300px; flex-grow: 10">
          <img :src="item.srcImg?? ''" style="min-height: 100%; min-width: 100%; object-fit: cover;" alt="">
        </div>
      </template>
    </div>

    <template v-slot:error>
      Hmm..
      smt went wrong, try next time
      {{ errorMsg }}
    </template>
  </VInfiniteScroll>
</template>

<style scoped lang="css">

</style>