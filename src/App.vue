<template>
  <Header/>
  <router-view/>
  <SvgSprite/>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import {MutationType} from "@/store/mutations/types";
  import store from "@/store"
  import Header from "@/components/Header.vue";
  import SvgSprite from "@/components/SvgSprite.vue";

  export default defineComponent({
    name: "App",
    components: {
      SvgSprite,
      Header
    },
    setup() {
      store.commit(MutationType.INITIALISE_STORE)
    }
  })
</script>


<style lang="scss">
  @import '~normalize.css';

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
    color: #2a2a2a;
    position: relative;
  }

  input,
  select,
  button,
  textarea {
    appearance: none;
    background: none;
    outline: none;
    &:hover,
    &:focus,
    &:active {
      outline: none;
      background: none;
    }
  }

  select::-ms-expand,
  input::-ms-clear,
  input::-ms-reveal {
    display: none;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-calendar-picker-indicator {
    color: rgba(0, 0, 0, 0);
    background-color: transparent;
    -webkit-appearance: none;
  }


  body {
    max-width: 375px;
    max-height: 670px;
    display: flex;
    flex-direction: column;
  }

  #app {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    padding: 0 16px 16px;
    background-color: #f3f4f8;
  }
</style>