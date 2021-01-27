<template>
  <div>
    <form class="form" @submit.prevent="fetchWeather">
      <input class="form__input" type="text"
             :class="{'form__input_error': error.message}"
             v-model.lazy="city" @input="error.message = ''">
      <p class="form__error" v-if="error.message">
        {{ error.message }}
      </p>
      <button class="form__button" type="submit">
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
  import FieldError from "@/models/FieldError";

  export default defineComponent({
    name: "Settings",
    components: {
      draggable
    },
    setup() {
      const city = ref()
      const error = ref({} as FieldError)

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

      const fetchWeather = () => {
        if (city.value) {
          store.dispatch(ActionType.ADD_CITY, `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`)
          .catch((response: Error) => {
            error.value.message = response.message
          })

          clear()
        } else {
          error.value.message = 'Field is required'
        }
      }

      return {
        city,
        cities,
        error,
        fetchWeather,
        deleteCity
      };
    }
  })
</script>

<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;

    &__input {
      padding: 8px 12px;
      font-size: 14px;
      background-color: map_get($palette, white);
      border: 1px solid map_get($palette, border);
      border-radius: 4px;

      &:hover,
      &:focus {
        background-color: map_get($palette, white);
      }

      &_error {
        border-color: map_get($palette, error);
      }
    }

    &__error {
      margin: 8px 0 0;
      font-weight: 300;
      font-size: 12px;
      color: map_get($palette, error);
    }

    &__button {
      margin-top: 8px;
      padding: 12px 16px;
      background-color: map_get($palette, accent-main);
      border: none;
      border-radius: 4px;
      transition: .3s ease all;

      &:hover,
      &:focus {
        background-color: darken(map_get($palette, accent-main), 20);
        cursor: pointer;
      }
    }
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 12px;
    background-color: map_get($palette, white);
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .05);

    &:last-of-type {
      margin-bottom: 0;
    }

    &__drag {
      display: flex;
      width: 20px;
      height: 20px;
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
          fill: map_get($palette, error);
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