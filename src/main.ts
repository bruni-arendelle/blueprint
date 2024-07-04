import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initGraph } from './graph'

initGraph()
createApp(App).mount('#app')
