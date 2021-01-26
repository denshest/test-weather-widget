<template>
  <Header/>
  <main>
    <router-view/>
  </main>
  <SvgSprite/>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import {MutationType} from "@/store/mutations/types";
  import store from "@/store"
  import Header from "@/components/Header.vue";
  import SvgSprite from "@/components/SvgSprite.vue";

  export default defineComponent({
    name: "App",
    components: {
      SvgSprite,
      Header
    },
    setup() {
      store.commit(MutationType.INITIALISE_STORE)
    }
  })
</script>