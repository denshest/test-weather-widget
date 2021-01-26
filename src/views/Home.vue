<template>
  <div v-if="cities">
    <Weather v-for="item in cities" :key="item.id" :item="item" />
  </div>
  <div v-else>
    Add city in Settings
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref} from "vue"
  import store from "@/store"
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
      }

      return {
        weatherList,
        cities
      };
    }
  })
</script>