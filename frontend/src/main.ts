import {createApp} from 'vue'
import App from './App.vue'
import './style.css';

const app = createApp({
    App
})
//  这里的 #app 是一个css选择器字段，用来描述整个APP的css基调
app.mount('#app')
