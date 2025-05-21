import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
// Iconos necesarios para el proyecto Pizzería (Pizzas, Sucursales, Ingredientes Extras)
import { faPlus, faEdit, faTrash, faPizzaSlice, faDollarSign, faInfoCircle, faHome, faUser, faStore, faMapMarkerAlt, faEye, faLeaf, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Swal from 'sweetalert2';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Añade todos los iconos a la librería de FontAwesome
library.add(faPlus, faEdit, faTrash, faPizzaSlice, faDollarSign, faInfoCircle, faHome, faUser, faStore, faMapMarkerAlt, faEye, faLeaf, faTag);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(VueSweetalert2);
app.config.globalProperties.$swal = Swal;

app.mount('#app');