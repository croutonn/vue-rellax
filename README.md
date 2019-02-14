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

#### Browser Support

Since this plugin uses WeakMap, old browsers need to load pollyfill.

```html
<script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=WeakMap"></script>
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

#### Destroy

To `destroy`, assign `false` to `v-relax`.

```js
const vm = new Vue({
  el: '#app',
  template: `
    <div>
      <p v-rellax="rellax">
        I’m slow and smooth
      </p>
      <button type="button" @click="destroyRellax">Destroy Rellax</button>
    </div>
  `,
  data() {
    return {
      rellax: {
        speed: -2
      }
    }
  },
  methods: {
    destroyRellax() {
      this.rellax = false
    }
  }
})
```

#### For Nuxt.js

In your `nuxt.config.js`

```js
{
  plugins: [
    { src: '~~/node_modules/vue-rellax/lib/nuxt-plugin', ssr: false }
  ]
}
```
