import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faEdit, faTrash, faPizzaSlice, faDollarSign, faInfoCircle, faHome, faUser, faStore, faMapMarkerAlt, faEye, faLeaf, faTag, faShoppingCart, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Swal from 'sweetalert2';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


library.add(faPlus, faEdit, faTrash, faPizzaSlice, faDollarSign, faInfoCircle, faHome, faUser, faStore, faMapMarkerAlt, faEye, faLeaf, faTag, faShoppingCart, faClipboardList);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(VueSweetalert2);
app.config.globalProperties.$swal = Swal;

app.mount('#app');