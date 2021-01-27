const isWidget = process.env.TYPE === 'widget';
let config = {};

if (isWidget) {
    config = {
        configureWebpack: {
            optimization: {
                splitChunks: false
            }
        },
    }
}

const loaderConfig = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/styles/base/variables.scss";`
            }
        }
    }
}

module.exports = Object.assign(loaderConfig, config)