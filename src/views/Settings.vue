<template>
  <div>
    <form @submit.prevent="fetchWeather">
      <input type="text" v-model.lazy="city">
      <button type="submit">
        Add Location
      </button>
    </form>
    <p>
      List of cities:
    </p>
    <div v-for="item in cities" :key="item.id" class="card">
      <p class="card__title">
        {{ item.name }}, {{ item.country }}
      </p>
      <button type="button" @click="deleteCity(item.id)" class="card__remove">
        <svg>
          <use xlink:href="#icon-trash"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref} from "vue"
  import store from "@/store"
  import {ActionType} from "@/store/actions/types"

  export default defineComponent({
    name: "Settings",
    setup() {
      const city = ref('')
      const cities = computed(() => store.state.cities)
      const clear = () => city.value = ''
      const deleteCity = (id: number) => store.dispatch(ActionType.DELETE_CITY, id)

      const fetchWeather = async () => {
        if (city.value) {
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`)

          if (response.ok) {
            const result = await response.json();

            await store.dispatch(ActionType.ADD_CITY, {
              city: {
                id: result.id,
                name: result.name,
                country: result.sys.country
              }
            })
          }

          clear()
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

<style lang="scss">
  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 12px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .05);

    &:last-of-type {
      margin-bottom: 0;
    }

    &__title {
      margin: 0;
    }

    &__remove {
      width: 20px;
      height: 20px;
      padding: 0;
      background: none;
      border: none;
      box-shadow: none;

      &:hover {
        cursor: pointer;

        svg {
          fill: #ff3448
        }
      }

      &:focus,
      &:active {
        outline: none;
      }

      svg {
        width: 100%;
        height: 100%;
        transition: .3s ease all;
      }
    }
  }
</style>