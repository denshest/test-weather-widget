<template>
  <div v-if="cities">
    <Weather v-for="item in cities" :key="item.id" :item="item" />
  </div>
  <div v-else>
    Add city in Settings
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed} from "vue"
  import store from "@/store"
  import Weather from "@/components/Weather.vue";

  export default defineComponent({
    name: "Home",
    components: {
      Weather
    },
    setup() {
      const cities = computed(() => store.state.cities)

      return {
        cities
      };
    }
  })
</script>