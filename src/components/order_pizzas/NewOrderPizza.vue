<template>
  <div class="container text-start mt-4">
    <h1 class="text-primary fw-bold">Nueva Orden de Pizza</h1>
    <div class="card shadow-sm">
      <div class="card-header fw-bold bg-light">
        Detalles de la Orden
      </div>
      <div class="card-body">
        <form @submit.prevent="saveOrderPizza">
          <div class="row mb-3">
            <label for="customer_name" class="form-label">Nombre del Cliente</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="user" />
              </div>
              <input
                type="text"
                class="form-control"
                id="customer_name"
                placeholder="Nombre del cliente"
                v-model="orderPizza.customer_name"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="delivery_address" class="form-label">Dirección de Entrega</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </div>
              <input
                type="text"
                class="form-control"
                id="delivery_address"
                placeholder="Dirección de entrega"
                v-model="orderPizza.delivery_address"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="status" class="form-label">Estado de la Orden</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="info-circle" />
              </div>
              <select class="form-select" id="status" v-model="orderPizza.status" required>
                <option value="Pendiente">Pendiente</option>
                <option value="En Preparación">En Preparación</option>
                <option value="En Camino">En Camino</option>
                <option value="Entregada">Entregada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="pizzas" class="form-label">Seleccionar Pizzas</label>
            <div v-if="loadingPizzas" class="text-center">Cargando pizzas...</div>
            <div v-else-if="pizzas.length === 0" class="alert alert-warning">No hay pizzas disponibles.</div>
            <div v-else class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </div>
              <select class="form-select" id="pizzas" multiple v-model="selectedPizzas" @change="calculateTotalPrice">
                <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                  {{ pizza.name }} - ${{ pizza.price.toFixed(2) }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="extra_ingredients" class="form-label">Seleccionar Ingredientes Extras</label>
            <div v-if="loadingIngredients" class="text-center">Cargando ingredientes...</div>
            <div v-else-if="extraIngredients.length === 0" class="alert alert-warning">No hay ingredientes extras disponibles.</div>
            <div v-else class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="leaf" />
              </div>
              <select class="form-select" id="extra_ingredients" multiple v-model="selectedExtraIngredients" @change="calculateTotalPrice">
                <option v-for="ingredient in extraIngredients" :key="ingredient.id" :value="ingredient.id">
                  {{ ingredient.name }} - ${{ ingredient.price.toFixed(2) }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="total_price" class="form-label">Precio Total</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="dollar-sign" />
              </div>
              <input
                type="number"
                step="0.01"
                class="form-control"
                id="total_price"
                v-model="orderPizza.total_price"
                disabled
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Guardar Orden</button>
          <button @click="cancel" class="btn btn-secondary mx-2">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'NewOrderPizza',
  data() {
    return {
      orderPizza: {
        customer_name: '',
        delivery_address: '',
        total_price: 0,
        status: 'Pendiente',
        pizzas: [], // IDs de las pizzas seleccionadas
        extra_ingredients: [] // IDs de los ingredientes extras seleccionados
      },
      pizzas: [],
      extraIngredients: [],
      selectedPizzas: [],
      selectedExtraIngredients: [],
      loadingPizzas: true,
      loadingIngredients: true,
      error: null
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'OrderPizzas' });
    },
    async fetchPizzasAndIngredients() {
      this.loadingPizzas = true;
      this.loadingIngredients = true;
      this.error = null;
      try {
        const [pizzasRes, ingredientsRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/pizzas'),
          axios.get('http://127.0.0.1:8000/api/extra_ingredients')
        ]);
        this.pizzas = pizzasRes.data.pizzas;
        this.extraIngredients = ingredientsRes.data.extraIngredients;
      } catch (error) {
        this.error = 'No se pudieron cargar las pizzas o los ingredientes extras.';
        console.error('Error fetching data for new order:', error);
        Swal.fire('Error', this.error, 'error');
      } finally {
        this.loadingPizzas = false;
        this.loadingIngredients = false;
      }
    },
    calculateTotalPrice() {
      let total = 0;
      this.selectedPizzas.forEach(pizzaId => {
        const pizza = this.pizzas.find(p => p.id === pizzaId);
        if (pizza) {
          total += parseFloat(pizza.price);
        }
      });
      this.selectedExtraIngredients.forEach(ingredientId => {
        const ingredient = this.extraIngredients.find(i => i.id === ingredientId);
        if (ingredient) {
          total += parseFloat(ingredient.price);
        }
      });
      this.orderPizza.total_price = total;
    },
    async saveOrderPizza() {
      this.orderPizza.pizzas = this.selectedPizzas;
      this.orderPizza.extra_ingredients = this.selectedExtraIngredients;

      this.loading = true;
      this.error = null;
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/order_pizzas', this.orderPizza);
        if (res.status === 200 || res.status === 201) {
          this.$router.push({ name: 'OrderPizzas' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Orden de pizza guardada correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.error = `Error al guardar: Código de estado ${res.status}`;
          Swal.fire('Error', this.error, 'error');
        }
      } catch (error) {
        this.error = 'No se pudo guardar la orden de pizza.';
        if (error.response) {
          this.error += ` Código: ${error.response.status}. Mensaje: ${error.response.data.message || 'Error del servidor.'}`;
        } else if (error.request) {
          this.error += ' No se recibió respuesta del servidor.';
        } else {
          this.error += ` Mensaje: ${error.message}`;
        }
        Swal.fire('Error', this.error, 'error');
        console.error('Error saving order pizza:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchPizzasAndIngredients();
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
.input-group-text {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-right: 0;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem 0 0 0.25rem;
}
.form-control, .form-select {
  border-radius: 0 0.25rem 0.25rem 0;
}
</style>