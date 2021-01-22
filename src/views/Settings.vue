<template>
  <div>
    <div>
      <form @submit.prevent="fetchWeather">
        <label for="input_city">
          Add Location:
        </label>
        <input id="input_city" type="text" v-model.lazy="city">
        <button type="submit">
          OK
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import Data from "@/models/Data";

export default defineComponent({
  name: "Settings",
  setup() {
    const city = ref('')

    const clear = () => {
      city.value = ''
    }

    const updateStorage = (cities: Array<number>) => localStorage.setItem('cities', JSON.stringify(cities))

    const list = computed((): Array<number> => JSON.parse(localStorage.getItem('cities') ?? '[]'));

    const fetchWeather = () => {
      if (city.value) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`)
            .then(response => response.json())
            .then((result: Data) => {
              list.value.push(result.id)
              updateStorage(list.value)
              clear()
            })
      }
    }

    return {
      city,
      fetchWeather
    };
  }
})
</script>

<style scoped>

</style>