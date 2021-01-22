<template>
    <div>
      {{data}}
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, computed} from "vue"

    export default defineComponent({
        name: "Home",
        setup() {
            const data = ref('');
            const city = ref('');
            const list = computed((): Array<number> => JSON.parse(localStorage.getItem('cities') ?? '[]'));

            const fetchWeather = async () => {
              if (list.value.length) {
                data.value = await fetch(
                    `http://api.openweathermap.org/data/2.5/group?id=${list.value.join(',')}&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`
                ).then((response) => response.json());
              }
            };

          onMounted(fetchWeather)

            return {
              data,
              city,
              fetchWeather
            };
        }
    })
</script>

<style scoped>

</style>