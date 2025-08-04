import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// isReady(); 메소드는 리턴값 primise를 리턴함(뒤에 .)
router.isReady().then(() => {
    app.mount('#app')
});
