// src/main.js
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faUser, faPhone, faPhoneAlt, faEnvelope, faLock, faSignOutAlt, faHome, 
  faHistory, faPaperPlane, faTimes, faBars, faKey, faArrowLeft,
  faBriefcase, faHeart, faCoins, faHeartbeat, faStar, 
  faExclamationCircle, faQuestionCircle, faSun, faCloud, 
  faBalanceScale, faPlusCircle, faMinusCircle, faTrashAlt,
  faIdCard, faCreditCard, faChevronDown, faUserCircle, faPlus,
  // Icons mới
  faMobileAlt, faArrowRight, faChevronUp, faMobile, faMoneyBill, 
  faUniversity, faExclamationTriangle, faCalendarAlt, faChevronLeft, faChevronRight,
  // Icons bị thiếu
  faCompass, faTools, faTags
} from '@fortawesome/free-solid-svg-icons'

// Add all the necessary icons
library.add(
  faUser, faPhone, faPhoneAlt, faEnvelope, faLock, faSignOutAlt, faHome, 
  faHistory, faPaperPlane, faTimes, faBars, faKey, faArrowLeft,
  faBriefcase, faHeart, faCoins, faHeartbeat, faStar, 
  faExclamationCircle, faQuestionCircle, faSun, faCloud, 
  faBalanceScale, faPlusCircle, faMinusCircle, faTrashAlt,
  faIdCard, faCreditCard, faChevronDown, faUserCircle, faPlus,
  // Icons mới
  faMobileAlt, faArrowRight, faChevronUp, faMobile, faMoneyBill,
  faUniversity, faExclamationTriangle, faCalendarAlt, faChevronLeft, faChevronRight,
  // Icons bị thiếu
  faCompass, faTools, faTags
)

// Import global CSS
import './assets/main.css'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')