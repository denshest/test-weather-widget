<template>
    <div>
      <div v-for="item in weatherList.list" :key="item.id" style="margin-bottom: 32px;">
        <p>
          {{ item.name }}, {{ item.sys.country }}
        </p>
        <div style="display: flex; align-items: center">
          <img :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`">
          <p>
            {{ Math.trunc(item.main.temp) }}
          </p>
        </div>
        <p>
          Feels like {{ Math.trunc(item.main.feels_like) }}
        </p>
      </div>
    </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref} from "vue"
  import store from "@/store"
  import City from "@/models/City";
  import GroupData from "@/models/GroupData";

  export default defineComponent({
    name: "Home",
    setup() {
      const weatherList = ref({} as GroupData)
      const cities = computed(() => store.state.cities)

      const fetchWeather = async () => {
        if (cities.value.length) {
          const ids = cities.value.map((city: City) => city.id)
          weatherList.value = await fetch(
          `http://api.openweathermap.org/data/2.5/group?id=${ids.join(',')}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`
          ).then((response) => response.json());
        }
      };

      fetchWeather()

      return {
        weatherList
      };
    }
  })
</script>

<style scoped>

</style>