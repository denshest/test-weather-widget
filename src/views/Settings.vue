<template>
  <div>
    <form @submit.prevent="fetchWeather">
      <input type="text" v-model.lazy="city">
      <button type="submit">
        Add Location
      </button>
    </form>
    <p>
      Cities:
    </p>
    <draggable v-model="cities" item-key="id" handle=".card__drag">
      <template #item="{element}">
        <div class="card">
          <button class="card__drag">
            <svg class="card__icon card__icon_type_drag">
              <use xlink:href="#icon-menu"></use>
            </svg>
          </button>
          <p class="card__title">
            {{ element.name }}, {{ element.country }}
          </p>
          <button type="button" @click="deleteCity(element.id)" class="card__remove">
            <svg class="card__icon card__icon_type_remove">
              <use xlink:href="#icon-trash"></use>
            </svg>
          </button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref, WritableComputedRef} from "vue"
  import store from "@/store"
  import {ActionType} from "@/store/actions/types"
  import draggable from 'vuedraggable'
  import City from "@/models/City";

  export default defineComponent({
    name: "Settings",
    components: {
      draggable
    },
    setup() {
      const city = ref()

      const cities: WritableComputedRef<City[]> = computed({
        get(): City[] {
          return store.state.cities
        },
        set(newValue: City[]): void {
          store.dispatch(ActionType.UPDATE_CITIES, newValue)
        },
      });

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

    &__drag {
      width: 20px;
      height: 20px;
      display: flex;
      padding: 0;
      border: none;

      &:hover {
        cursor: pointer;
      }
    }

    &__title {
      margin: 0 auto 0 16px;
    }

    &__remove {
      width: 28px;
      height: 28px;
      padding: 0;
      background: none;
      border: none;
      box-shadow: none;

      &:hover {
        cursor: pointer;

        .card__icon {
          fill: #ff3448
        }
      }

      &:focus,
      &:active {
        outline: none;
      }
    }

    &__icon {
      width: 100%;
      height: 100%;
      transition: .3s ease all;
    }
  }
</style>