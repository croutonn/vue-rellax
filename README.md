# vue-rellax

A plugin of Vue that adds a directive for parallax effect by [Rellax.js](https://dixonandmoe.com/rellax/).

## Getting Started

### Install

```sh
npm i vue-rellax -S
```

or

```sh
yarn add vue-rellax
```

### Usage

```js
import Vue from 'vue'
import VueRellax from 'vue-rellax'

Vue.use(VueRellax)

const vm = new Vue({
  el: '#app',
  template: `
    <div v-rellax="{
      // Rellax Options
      // See: https://github.com/dixonandmoe/rellax#features
      speed: -2,
    }">
      I’m slow and smooth
    </div>
  `
})
```

#### For Nuxt.js

In your `nuxt.config.js`

```js
{
  plugins: [
    { src: 'node_modules/vue-rellax/lib/nuxt-plugin', ssr: false }
  ]
}
```
