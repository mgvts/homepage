<script lang=ts>
  import {ref} from "vue";
  import {defineNuxtComponent, useFetch} from "nuxt/app";
  import {VForm} from "vuetify/components";

  export default defineNuxtComponent({
      name: 'Main',
      setup() {
        const id = ref(1)
        const {
          data: product,
          pending,
          error,
        } = useFetch(() => `https://dummyjson.com/users/${id.value}`)
        return {
          id,
          product,
          pending,
          error
        }
      },
      data() {
        return {
          currentTextInpValue: ref(''),
          rules: [
            (smt: string) => {
              return !!smt || 'must be non empty'
            },
            (smt: string) => {
              return Number.isInteger(+smt) || 'must be integer'
            },
            (smt: string) => {
              return Number.isInteger(+smt) || 'must be integer'
            }
          ],
        }
      },
      methods: {
        async foo() {
          if ((this.$refs.form as VForm).isValid) this.id = +(this.currentTextInpValue)
        }
      },
    }
  )
</script>

<template>
<div class="page">
  <div>
    <ColorThemeSwitch/>
  </div>
  <div class="d-flex flex-column ga-2">
    <div class="d-flex align-center justify-space-around">
      <VBtn class="cursor-pointer w-25" @click.prevent="id++">next json</VBtn>
      <VForm @submit.prevent="foo"
             class="w-25 flex flex-row"
             fast-fail
             ref="form"
      >
        <VTextField
          :loading="pending"
          v-model="currentTextInpValue"
          label="put actual id" clearable variant="solo"
          :rules="rules"
        />
        <VBtn class="w-100" type="submit">Execute</VBtn>
      </VForm>
    </div>
    <div>
      <p v-if="pending">Fetching...</p>
      <pre v-else-if="error">{{ error }}</pre>
      <pre v-else>{{ product }}</pre>
    </div>
  </div>
</div>
</template>

<style scoped>
.page {
  margin: 0.5rem;
}
</style>