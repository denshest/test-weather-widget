# test-weather-widget
Test task for some company.

The problems I had to face:
1. Vue.js 3 not supporting web-components
2. I wanted to use [this API call](https://openweathermap.org/current#severalid) for several cities, 
   but it was returning older data than API calls for each city separately. 
   That's why I used several API calls for each city [this](https://github.com/denshest/test-weather-widget/blob/main/src/components/Weather.vue#L147).


- [Project setup](#project-setup)
- [Developer scripts](#developer-scripts)
- [How to usage widget](#how-to-usage-weather-widget)

## Project setup
1. Create `.env` with content:
```
VUE_APP_OPENWEATHER_APP_ID=YOUR_APP_ID
```
2. Install all dependencies
```
npm install
```

### Compiles and minifies for production (SPA)
```
npm run build
```

### Compiles and minifies for widget
```
npm run build-widget
```

## Developer scripts

### Compiles and hot-reloads for development
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

### CS fixes files
```
npm run cs:fix
```

## How to usage weather-widget
After [building assets](#compiles-and-minifies-for-widget) for weather-widget you need to following next instruction:

1. Add `dist/css/app.[hash].css` to `<head>` section of your website
2. Add `dist/js/app.[hash].js` before `</body>` section of your website
3. Add `weather-widget` to `<body>` of your website

```
<head>
    <link href="dist/css/app.[hash].css" rel="stylesheet">
</head>
<body>
   <weather-widget/>
   <script src="dist/js/app.[hash].js"></script>
</body>
</html>
```