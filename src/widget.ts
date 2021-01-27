import { createApp } from "vue";

import App from "./App.vue";
import router from "@/router";
import store from "@/store";

class WeatherWidget extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const options = typeof App === "function" ? App.options : App;
    const propsList: string[] = Array.isArray(options.props) ? options.props : Object.keys(options.props || {});

    const props: { [index: string]: string} = {};

    for (const prop of propsList) {
      const propValue = process.env.NODE_ENV === "development" ? process.env[`VUE_APP_${prop.toUpperCase()}`] : this.attributes.getNamedItem(prop)?.value;

      if (!propValue) {
        console.error(`Missing attribute ${prop}`);
        return;
      }

      props[prop] = propValue;
    }

    const app = createApp(App, props).use(router).use(store);

    const wrapper = document.createElement("div");
    app.mount(wrapper);

    this.appendChild(wrapper);
  }
}

window.customElements.define("weather-widget", WeatherWidget);