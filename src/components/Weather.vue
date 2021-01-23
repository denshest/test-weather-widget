<template>
  <article class="weather-card">
<!--    {{item}}-->
    <header class="weather-card__header">
      <p>
        <strong>{{ item.name }}</strong>, {{ item.sys.country }}
      </p>
      <button>
        update
      </button>
    </header>
    <div style="display: flex; align-items: center">
      <img :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`">
      <p>
        {{ Math.trunc(item.main.temp) }}
      </p>
    </div>
    <p>
      Feels like {{ Math.trunc(item.main.feels_like) }}
    </p>
  </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import Data from "@/models/Data";

export default defineComponent({
  name: "Weather",
  props: {
    item: {
      type: Object as PropType<Data>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
  .weather-card {
    margin-bottom: 16px;
    padding: 12px 16px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .05);

    &:last-of-type {
      margin-bottom: 0;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>