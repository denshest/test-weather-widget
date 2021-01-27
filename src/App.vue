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
  import {ActionType} from "@/store/actions/types";

  export default defineComponent({
    name: "App",
    components: {
      SvgSprite,
      Header
    },
    setup() {
      store.commit(MutationType.INITIALISE_STORE)

      const successHandler = (position: Position) => {
        store.dispatch(ActionType.ADD_CITY, `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`)
      }

      const errorHandler = (error: PositionError): void => {
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