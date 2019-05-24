# vue-oxford

A component that renders components in a comma-separated list, with an Oxford comma.

## Installation

Via yarn:

```sh
yarn add vue-oxford
```

Via npm:

```sh
npm install vue-oxford --save
```

In your `main.js` or wherever your Vue instance is initialized:

```js
import Vue from 'vue'
import VueOxford from 'vue-oxford'

Vue.component('vue-oxford', VueOxford)
```

Or add it locally to a component:

```vue
<script>
import VueOxford from 'vue-oxford'

export default {
  ...
  components: { VueOxford }
}
</script>
```

## Usage

With a list of some sort (here a list of colors containing `['red', 'blue', 'green', 'pink']`):

```vue
<p>
  My favorite colors are
  <vue-oxford>
    <span v-for="color in list">{{ color }}</span>
  </vue-oxford>
  .
</p>
```

renders as:

```text
My favorite colors are red, blue, green, and pink.
```
