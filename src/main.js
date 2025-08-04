import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


import App from './App.vue'
import router from './router'

//부트스트랩
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'


const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(BootstrapVue3)

// isReady(); 메소드는 리턴값 primise를 리턴함(뒤에 .)
router.isReady().then(() => {
    app.mount('#app')
});
