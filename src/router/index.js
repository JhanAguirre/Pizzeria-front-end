import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import Pizzas from '../views/Pizzas.vue'; // Componente principal para listar pizzas
import NewPizza from '../components/pizzas/NewPizza.vue'; // Componente para agregar pizza
import EditPizza from '../components/pizzas/EditPizza.vue'; // Componente para editar pizza

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pizzas',
    name: 'Pizzas',
    component: Pizzas
  },
  {
    path: '/add-pizza',
    name: 'NewPizza',
    component: NewPizza
  },
  {
    path: '/edit-pizza/:id', // Ruta para editar, con un parámetro dinámico 'id'
    name: 'EditPizza',
    component: EditPizza
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
