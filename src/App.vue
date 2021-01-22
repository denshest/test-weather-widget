<template>
  <Header/>
  <router-view/>
</template>

<script>
  import {defineComponent} from "vue";
  import Header from "@/components/Header";

  export default defineComponent({
    name: "App",
    components: {
      Header
    }
  })
</script>