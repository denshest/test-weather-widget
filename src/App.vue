<template>
  <Header/>
  <main>
    <router-view/>
  </main>
  <SvgSprite/>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import {MutationType} from "@/store/mutations/types";
  import store from "@/store"
  import Header from "@/components/Header.vue";
  import SvgSprite from "@/components/SvgSprite.vue";
  import Data from "@/models/Data";
  import {ActionType} from "@/store/actions/types";

  export default defineComponent({
    name: "App",
    components: {
      SvgSprite,
      Header
    },
    setup() {
      store.commit(MutationType.INITIALISE_STORE)

      const successHandler = async (position: Position) => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`)

        if (response.ok) {
          const result: Data = await response.json();

          await store.dispatch(ActionType.ADD_CITY, {
            city: {
              id: result.id,
              name: result.name,
              country: result.sys.country
            }
          })
        }
      }

      const errorHandler = (error: PositionError) => {
        console.error(error.message);
      }

      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
      }
    }
  })
</script>

<style lang="scss" src="@/styles/main.scss"></style>