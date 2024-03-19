<script lang=ts>
import {ref} from "vue";
import {defineNuxtComponent, useFetch} from "nuxt/app";
import {VForm} from "vuetify/components";

export default defineNuxtComponent({
      name: 'DataFetch',
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
          currentTextInpValue: '',
          rules: [
            (smt: string) => {
              return !!smt || 'must be non empty'
            },
            (smt: string) => {
              return Number.isInteger(+smt) || 'must be integer'
            },
            (smt: string) => {
              return +smt < 100 || 'must be lower then 100'
            },
            (smt: string) => {
              return +smt > 0 || 'must be positive'
            }
          ],
        }
      },
      methods: {
        async applyInd() {
          let {valid} = await (this.$refs.form as VForm).validate()
          if (!valid) return
          this.id = +this.currentTextInpValue
          ;(this.$refs.form as VForm).reset()
        },
      },
    }
)
</script>

<template>
<!--  todo replace all MyHeader into theme/some wrapper -->
  <MyHeader/>
  <VContainer class="page">
    <div class="d-flex flex-column ga-2">
      <div class="d-flex align-center justify-space-around">
        <VBtn class="cursor-pointer w-25" @click.prevent="id++">next json</VBtn>
        <VForm
            class="w-25 flex flex-row"
            ref="form"
        >
          <VTextField
              :loading="pending"
              v-model="currentTextInpValue"
              label="put actual id" clearable variant="solo"
              :rules="rules"
          />
          <VBtn class="w-100" @click.prevent="applyInd">Execute</VBtn>
        </VForm>
      </div>
      <div>
        <p v-if="pending">Fetching...</p>
        <pre v-else-if="error">{{ error }}</pre>
        <pre v-else>{{ product }}</pre>
      </div>
    </div>
  </VContainer>
</template>

<style scoped>

</style>