<template>
  <Header/>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
  import {MutationType} from "@/store/mutations/types";
  import store from "@/store"
  import Header from "@/components/Header.vue";

  export default defineComponent({
    name: "App",
    components: {
      Header
    },
    setup() {
      store.commit(MutationType.INITIALISE_STORE)
    }
  })
</script>