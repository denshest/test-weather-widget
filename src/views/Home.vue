<template>
    <div>
      <div v-if="cities">
        <Weather v-for="item in weatherList.list" :key="item.id" :item="item" />
      </div>
      <div v-else>
        Add city in Settings
      </div>
    </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref} from "vue"
  import store from "@/store"
  import City from "@/models/City";
  import GroupData from "@/models/GroupData";
  import Data from "@/models/Data";
  import {ActionType} from "@/store/actions/types";
  import Weather from "@/components/Weather.vue";

  export default defineComponent({
    name: "Home",
    components: {
      Weather
    },
    setup() {
      const isCurrentCityFound = computed(() => store.state.isCurrentCityFound)
      const cities = computed(() => store.state.cities)
      const weatherList = ref({} as GroupData)

      const fetchWeather = async () => {
        if (cities.value.length) {
          const ids = cities.value.map((city: City) => city.id)
          weatherList.value = await fetch(
              `http://api.openweathermap.org/data/2.5/group?id=${ids.join(',')}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`
          ).then((response) => response.json());
        }
      };

      const successHandler = (position: Position) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`)
            .then(response => response.json())
            .then((result: Data) => {
              store.dispatch(ActionType.ADD_CITY, {
                city: {
                  id: result.id,
                  name: result.name,
                  country: result.sys.country
                },
                isCurrentCity: true
              })
              fetchWeather()
            })
      }

      const errorHandler = (error: PositionError) => {
        console.error(error.message);
      }

      if (!isCurrentCityFound.value) {
        if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
        } else {
          navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
        }
      } else {
        fetchWeather()
      }

      return {
        weatherList,
        cities
      };
    }
  })
</script>

<style scoped>

</style>