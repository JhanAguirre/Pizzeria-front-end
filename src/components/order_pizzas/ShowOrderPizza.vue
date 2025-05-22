<template>
  <div class="container text-start mt-4">
    <h1 class="text-primary fw-bold">Detalles de la Orden de Pizza</h1>
    <div class="card shadow-sm">
      <div class="card-header fw-bold bg-light">
        Información de la Orden
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <p>Cargando detalles de la orden...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          <strong>Error:</strong> {{ error }}
          <p class="mt-2">Por favor, asegúrate de que el ID de la orden sea válido y que el servidor Laravel esté funcionando.</p>
        </div>

        <div v-else>
          <div class="mb-3">
            <strong>ID:</strong> {{ orderPizza.id }}
          </div>
          <div class="mb-3">
            <strong>Nombre del Cliente:</strong> {{ orderPizza.customer_name }}
          </div>
          <div class="mb-3">
            <strong>Dirección de Entrega:</strong> {{ orderPizza.delivery_address }}
          </div>
          <div class="mb-3">
            <strong>Estado:</strong> {{ orderPizza.status }}
          </div>
          <div class="mb-3">
            <strong>Precio Total:</strong> ${{ orderPizza.total_price ? orderPizza.total_price.toFixed(2) : '0.00' }}
          </div>

          <div class="mb-3">
            <strong>Pizzas en la Orden:</strong>
            <ul v-if="orderPizza.pizzas && orderPizza.pizzas.length > 0">
              <li v-for="pizza in orderPizza.pizzas" :key="pizza.id">
                {{ pizza.name }} - ${{ pizza.price ? pizza.price.toFixed(2) : '0.00' }}
              </li>
            </ul>
            <p v-else>No hay pizzas asociadas a esta orden.</p>
          </div>

          <div class="mb-3">
            <strong>Ingredientes Extras:</strong>
            <ul v-if="orderPizza.extra_ingredients && orderPizza.extra_ingredients.length > 0">
              <li v-for="ingredient in orderPizza.extra_ingredients" :key="ingredient.id">
                {{ ingredient.name }} - ${{ ingredient.price ? ingredient.price.toFixed(2) : '0.00' }}
              </li>
            </ul>
            <p v-else>No hay ingredientes extras asociados a esta orden.</p>
          </div>

          <div class="mb-3">
            <strong>Creada el:</strong> {{ orderPizza.created_at ? new Date(orderPizza.created_at).toLocaleString() : 'N/A' }}
          </div>
          <div class="mb-3">
            <strong>Última actualización:</strong> {{ orderPizza.updated_at ? new Date(orderPizza.updated_at).toLocaleString() : 'N/A' }}
          </div>
          <button @click="goBack" class="btn btn-secondary mt-3">Volver al Listado</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'ShowOrderPizza',
  data() {
    return {
      orderPizza: {},
      loading: true,
      error: null
    };
  },
  methods: {
    // Método para obtener los detalles de una orden específica
    async fetchOrderPizzaDetails() {
      this.loading = true;
      this.error = null;
      try {
        const orderId = this.$route.params.id;
        // Se usa 'with' en Laravel para cargar las relaciones (pizzas y extra_ingredients)
        const response = await axios.get(`http://127.0.0.1:8000/api/order_pizzas/${orderId}`);
        this.orderPizza = response.data.orderPizza;
      } catch (error) {
        this.error = 'No se pudo cargar la información de la orden de pizza.';
        if (error.response) {
          this.error += ` Código: ${error.response.status}. Mensaje: ${error.response.data.message || 'Error del servidor.'}`;
        } else if (error.request) {
          this.error += ' No se recibió respuesta del servidor.';
        } else {
          this.error += ` Mensaje: ${error.message}`;
        }
        Swal.fire('Error', this.error, 'error');
        console.error('Error fetching order pizza details:', error);
      } finally {
        this.loading = false;
      }
    },
    // Método para volver a la lista de órdenes de pizza
    goBack() {
      this.$router.push({ name: 'OrderPizzas' });
    }
  },
  mounted() {
    this.fetchOrderPizzaDetails(); // Cargar los detalles cuando el componente se monta
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.container {
  max-width: 700px;
}
.card {
  border-radius: 0.5rem;
}
.card-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  padding: 1rem 1.25rem;
}
.card-body div {
  text-align: left;
  padding-left: 15px;
}
</style>