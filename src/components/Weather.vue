<template>
  <article class="weather-card" v-if="weatherData">
    <header class="weather-card__header">
      <p class="weather-card__title">
        <strong class="weather-card__title weather-card__title_weight_strong">{{ weatherData.name }}</strong>, {{ weatherData.sys.country }}
      </p>
      <button type="button" class="weather-card__update" @click="updateWeather">
        <svg class="weather-card__update-icon" ref="updateIcon">
          <use xlink:href="#icon-update"></use>
        </svg>
      </button>
    </header>
    <div class="weather-card__main">
      <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`" :alt="weatherData.weather[0].description" class="weather-card__image">
      <div class="weather-card__main-info">
        <div class="weather-card__main-wrapper">
          <p class="weather-card__current-temperature">
            {{ truncTemperature(metric ? weatherData.main.temp : celsiusToFahrenheit(weatherData.main.temp)) }}&#176;
          </p>
          <div class="weather-card__temperature-type">
            <span :class="{'active': metric}" @click="metric = true">C</span>
            <span :class="{'active': !metric}" @click="metric = false">F</span>
          </div>
        </div>
        <p class="weather-card__current-description">
          {{ weatherDescription }}
        </p>
      </div>
    </div>
    <div class="weather-card__body">
      <div class="weather-card-item" v-if="weatherData.wind">
        <svg class="weather-card-item__icon">
          <use xlink:href="#icon-wind"></use>
        </svg>
        <p class="weather-card-item__description">
          <strong>
            {{ weatherData.wind.speed }}
          </strong>
          <sup>
            m/s
          </sup>
        </p>
      </div>
      <div class="weather-card-item" v-if="weatherData.main.humidity">
        <svg class="weather-card-item__icon">
          <use xlink:href="#icon-humidity"></use>
        </svg>
        <p class="weather-card-item__description">
          <strong>
            {{ weatherData.main.humidity }}%
          </strong>
        </p>
      </div>
      <div class="weather-card-item" v-if="weatherData.main.pressure">
        <svg class="weather-card-item__icon">
          <use xlink:href="#icon-pressure"></use>
        </svg>
        <p class="weather-card-item__description">
          <strong>
            {{ weatherData.main.pressure }}
          </strong>
          <sup>
            hPa
          </sup>
        </p>
      </div>
      <div class="weather-card-item" v-if="weatherData.clouds">
        <svg class="weather-card-item__icon">
          <use xlink:href="#icon-cloud"></use>
        </svg>
        <p class="weather-card-item__description">
          <strong>
            {{ weatherData.clouds.all }}%
          </strong>
        </p>
      </div>
    </div>
    <ul class="weather-card__list" v-if="expanded">
      <li class="weather-card__list-item">
        Feels like {{ truncTemperature(metric ? weatherData.main.feels_like : celsiusToFahrenheit(weatherData.main.feels_like)) }} &#176;<span v-text="metric ? 'C' : 'F'"></span>
      </li>
      <li class="weather-card__list-item">
        Wind direction: {{ degToCompass }}
      </li>
      <li class="weather-card__list-item">
        Min temp: {{ truncTemperature(metric ? weatherData.main.temp_min : celsiusToFahrenheit(weatherData.main.temp_min)) }} &#176;<span v-text="metric ? 'C' : 'F'"></span>
      </li>
      <li class="weather-card__list-item">
        Max temp: {{ truncTemperature(metric ? weatherData.main.temp_max : celsiusToFahrenheit(weatherData.main.temp_max)) }} &#176;<span v-text="metric ? 'C' : 'F'"></span>
      </li>
      <li class="weather-card__list-item">
        Sunrise: {{ localeDate(weatherData.sys.sunrise) }}
      </li>
      <li class="weather-card__list-item">
        Sunset: {{ localeDate(weatherData.sys.sunset) }}
      </li>
      <li class="weather-card__list-item">
        Visibility: {{ (weatherData.visibility / 1000).toFixed(1) }}<sup>km</sup>
      </li>
    </ul>
    <footer class="weather-card__footer">
      <button class="weather-card__more" v-text="expanded ? 'hide' : 'show more'" @click="expanded = !expanded"></button>
      <p class="weather-card__date">
        data received at {{ localeDate(weatherData.dt) }}
      </p>
    </footer>
  </article>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from "vue"
  import City from "@/models/City";
import Weather from "@/models/Weather";

  export default defineComponent({
    name: "Weather",
    props: {
      item: {
        type: Object as PropType<City>,
        required: true
      }
    },
    setup: function (props) {
      const updateIcon = ref(SVGElement);
      const weatherData = ref();
      const step = ref(1);
      const expanded = ref(false);
      const metric = ref(true);
      const windCompass = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

      const degToCompass = (computed((): string => windCompass[(Math.floor((weatherData.value.wind.deg / 22.5) + 0.5) % 16)]))
      const weatherDescription = (computed((): string => weatherData.value.weather.map((item: Weather) => item.description).join(', ')))


      const localeDate = (date: number): string => {
        return new Date(date * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }

      const celsiusToFahrenheit = (temperature: number): number => {
        return (temperature * 9 / 5) + 32;
      }

      const truncTemperature = (temperature: number): number => {
        return Math.trunc(temperature)
      }

      const fetchWeather = async () => {
        weatherData.value = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?id=${props.item.id}&units=metric&APPID=${process.env.VUE_APP_OPENWEATHER_APP_ID}`
        ).then((response) => (response.json()));
      }

      const updateWeather = async () => {
        if (updateIcon.value instanceof SVGElement) {
          updateIcon.value.style.transform = `rotate(${180 * step.value}deg)`
          step.value++;
        }

        await fetchWeather()
      }

      fetchWeather()

      return {
        updateWeather,
        truncTemperature,
        localeDate,
        celsiusToFahrenheit,
        updateIcon,
        weatherData,
        degToCompass,
        weatherDescription,
        expanded,
        metric
      }
    }
  })
</script>

<style lang="scss">
  .weather-card {
    margin-bottom: 16px;
    padding: 16px;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .05);

    &:last-of-type {
      margin-bottom: 0;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__title {
      margin: 0;
      font-weight: 300;
      font-size: 14px;

      &_weight_strong {
        font-weight: 500;
      }
    }

    &__update {
      padding: 0;
      border: none;
      opacity: .5;
      transition: .3s ease all;

      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }

    &__update-icon {
      width: 16px;
      height: 16px;
      transition: .1s ease all;
    }

    &__main {
      display: flex;
      align-items: center;
    }

    &__image {
      width: 150px;
    }

    &__main-info {
      width: 100%;
      font-weight: 300;
    }

    &__main-wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__temperature-type {
      display: flex;
      align-items: center;
      margin-right: 16px;

      span {
        font-weight: 500;
        font-size: 14px;
        color: map_get($palette, content-light);
        transition: .3s ease color;

        &:hover {
          color: map_get($palette, content);
          cursor: pointer;
        }

        &:first-child {
          margin-right: 10px;
        }

        &.active {
          font-size: 16px;
          color: map_get($palette, content);
        }
      }
    }

    &__current-temperature {
      margin: 0;
      font-size: 42px;
    }

    &__current-description {
      margin: 8px 0 0;
      font-size: 14px;
      text-transform: capitalize;
      color: map_get($palette, content-light);
    }

    &__body {
      display: flex;
      flex-wrap: wrap;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin: 24px 0 0;
      padding: 0 8px;
      list-style: none;
    }

    &__list-item {
      margin-bottom: 12px;
      font-weight: 300;
      font-size: 14px;
      flex-basis: 50%;
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 16px;
    }

    &__more {
      padding: 0;
      border: none;
      transition: .3s ease all;

      &:hover {
        color: map_get($palette, content);
        cursor: pointer;
      }
    }

    &__date,
    &__more {
      margin: 0;
      font-size: 12px;
      text-align: right;
      color: map_get($palette, content-light);
    }
  }

  .weather-card-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 25%;

    &__icon {
      width: 28px;
      height: 28px;
      fill: map_get($palette, accent-main);
    }

    &__description {
      margin: 8px 0 0;
      font-weight: 300;

      strong {
        font-weight: 500;
      }
    }
  }
</style>