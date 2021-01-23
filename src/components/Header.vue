<template>
  <header class="header">
    <p class="header__title" v-if="currentRoute === 'settings'">
      Settings
    </p>
    <router-link :to="{name: 'home'}" v-if="currentRoute === 'settings'" class="header__link">
      <svg class="header__icon">
        <use xlink:href="#icon-close"></use>
      </svg>
    </router-link>
    <router-link :to="{name: 'settings'}" v-else class="header__link">
      <svg class="header__icon header__icon_type_gear">
        <use xlink:href="#icon-gear"></use>
      </svg>
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
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      font-weight: 600;
      color: #9b9b9b;
    }

    &__link {
      justify-self: flex-end;
      margin: 0 0 0 auto;
    }

    &__icon {
      width: 16px;
      height: 16px;
      margin-right: 2px;

      &_type {
        &_gear {
          width: 20px;
          height: 20px;
          margin-right: 0;
        }
      }
    }
  }
</style>