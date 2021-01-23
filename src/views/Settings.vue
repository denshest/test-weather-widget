<template>
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

<style lang="scss" scoped>
  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 12px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 2px rgba(0,0,0,.4);

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