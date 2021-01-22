<template>
  <header class="header">
    <p class="header__title">
      Settings
    </p>
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

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      font-weight: 600;
      color: #9b9b9b;
    }
  }
</style>