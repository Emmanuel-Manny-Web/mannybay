import { createApp } from 'vue'
import App from './App.vue'
import Panel from './Panel.vue'
import router from './router'
import store from './store'
import './axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus, faEye, faCartArrowDown, faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faCartPlus, faEye, faCartArrowDown, faBars, faSearch)
import { FontAwesomeIcon } from './plugins/font-awesome'

createApp(Panel).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#panel')
