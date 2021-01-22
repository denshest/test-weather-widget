<template>
  <header>
    <router-link :to="{name: 'home'}" v-if="currentRoute !== 'home'">
      Home
    </router-link>
    <router-link :to="{name: 'settings'}" v-if="currentRoute !== 'settings'">
      Settings
    </router-link>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRoute } from 'vue-router'

export default defineComponent({
  name: "Header",
  setup() {
    const route = useRoute()

    const currentRoute = computed(() => route.name);

    return {
      currentRoute
    }
  }
})
</script>

<style scoped>

</style>