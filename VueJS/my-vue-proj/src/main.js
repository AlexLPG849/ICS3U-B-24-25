import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      product: 'Socks',
      description: 'A pair of warm, comfortable socks'
    }
  }
})

app.mount('#app')