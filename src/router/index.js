import { createRouter, createWebHashHistory } from 'vue-router';

// Importa los componentes de las vistas principales
import HomeView from '../views/HomeView.vue';
import Pizzas from '../views/Pizzas.vue'; // Componente principal para listar pizzas
import Branches from '../views/Branches.vue'; // Componente principal para listar sucursales
import ExtraIngredients from '../views/ExtraIngredients.vue'; // ¡NUEVO! Componente principal para listar ingredientes extras

// Importa los componentes de CRUD para Pizzas
import NewPizza from '../components/pizzas/Newpizza.vue';
import EditPizza from '../components/pizzas/Editpizza.vue';

// Importa los componentes de CRUD para Sucursales (solo Show)
import ShowBranch from '../components/branches/ShowBranch.vue';

// ¡NUEVO! Importa los componentes de CRUD para Ingredientes Extras
import NewExtraIngredient from '../components/extra_ingredients/NewExtraIngredient.vue';
import EditExtraIngredient from '../components/extra_ingredients/EditExtraIngredient.vue';
import ShowExtraIngredient from '../components/extra_ingredients/ShowExtraIngredient.vue';

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
    path: '/edit-pizza/:id', // Ruta para editar pizza, con un parámetro dinámico 'id'
    name: 'EditPizza',
    component: EditPizza
  },
  {
    path: '/branches',
    name: 'Branches',
    component: Branches
  },
  {
    path: '/show-branch/:id', // Ruta para ver los detalles de una sucursal
    name: 'ShowBranch',
    component: ShowBranch
  },
  // ¡NUEVO! Rutas para Ingredientes Extras
  {
    path: '/extra-ingredients',
    name: 'ExtraIngredients',
    component: ExtraIngredients
  },
  {
    path: '/add-extra-ingredient',
    name: 'NewExtraIngredient',
    component: NewExtraIngredient
  },
  {
    path: '/edit-extra-ingredient/:id',
    name: 'EditExtraIngredient',
    component: EditExtraIngredient
  },
  {
    path: '/show-extra-ingredient/:id',
    name: 'ShowExtraIngredient',
    component: ShowExtraIngredient
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