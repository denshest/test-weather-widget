<template>
  <div>
    <div v-for="item in cities" :key="item.id" style="display: flex; margin-bottom: 32px;">
      <p>
        {{ item.name }}, {{ item.country }}
      </p>
      <button type="button" @click="deleteCity(item.id)">
        delete
      </button>
    </div>

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
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue"
import store from "@/store"
import Data from "@/models/Data";
import {ActionType} from "@/store/actions/types";

export default defineComponent({
  name: "Settings",
  setup() {
    const city = ref('')
    const cities = computed(() => store.state.cities)
    const clear = () => city.value = ''
    const deleteCity = (id: number) => store.dispatch(ActionType.DELETE_CITY, id)

    const fetchWeather = () => {
      if (city.value) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`)
        .then(response => response.json())
        .then((result: Data) => {
          store.dispatch(ActionType.ADD_CITY, {
            city: {
              id: result.id,
              name: result.name,
              country: result.sys.country
            }
          })
          clear()
        })
      }
    }

    return {
      city,
      cities,
      fetchWeather,
      deleteCity
    };
  }
})
</script>

<style scoped>

</style>