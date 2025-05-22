<template>
  <div class="container mt-4">
    <h1 class="text-start mb-4">
      Listado de Órdenes de Pizza
      <button @click="newOrderPizza()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <div v-if="loading" class="text-center py-4">
      <p>Cargando órdenes...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      <strong>Error:</strong> {{ error }}
      <p class="mt-2">Por favor, asegúrate de que el servidor Laravel esté funcionando y que la URL de la API sea correcta.</p>
    </div>

    <div v-else-if="orderPizzas.length > 0">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Cliente</th>
            <th scope="col">Dirección</th>
            <th scope="col">Total</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orderPizzas" :key="order.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ order.customer_name }}</td>
            <td>{{ order.delivery_address }}</td>
            <td>${{ order.total_price ? order.total_price.toFixed(2) : '0.00' }}</td>
            <td>{{ order.status }}</td>
            <td>
              <button @click="showOrderPizza(order.id)" class="btn btn-info mx-1">
                <font-awesome-icon icon="eye" />
              </button>
              <button @click="editOrderPizza(order.id)" class="btn btn-warning mx-1">
                <font-awesome-icon icon="edit" />
              </button>
              <button @click="deleteOrderPizza(order.id)" class="btn btn-danger mx-1">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-4">
      <p>No se encontraron órdenes de pizza. La lista está vacía.</p>
      <p>Puedes agregar una nueva orden haciendo clic en el botón <font-awesome-icon icon="plus" />.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'OrderPizzas',
  data() {
    return {
      orderPizzas: [],
      loading: true,
      error: null
    };
  },
  methods: {
   
    fetchOrderPizzas() {
      this.loading = true;
      this.error = null;
      axios.get('http://127.0.0.1:8000/api/order_pizzas')
        .then(response => {
          this.orderPizzas = response.data.orderPizzas;
        })
        .catch(error => {
          this.error = 'No se pudo cargar la información de las órdenes de pizza.';
          console.error('Error fetching order pizzas:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    newOrderPizza() {
      this.$router.push({ name: 'NewOrderPizza' });
    },
 
    editOrderPizza(id) {
      this.$router.push({ name: 'EditOrderPizza', params: { id: id } });
    },
   
    showOrderPizza(id) {
      this.$router.push({ name: 'ShowOrderPizza', params: { id: id } });
    },
 
    deleteOrderPizza(id) {
      Swal.fire({
        title: `¿Deseas eliminar la Orden con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/order_pizzas/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success');
                this.fetchOrderPizzas(); 
              } else {
                Swal.fire('Error', response.data.message || 'No se pudo eliminar la orden.', 'error');
              }
            })
            .catch(error => {
              this.error = 'Error al eliminar la orden.';
              Swal.fire('Error', this.error, 'error');
              console.error('Error deleting order pizza:', error);
            });
        }
      });
    }
  },
  mounted() {
    this.fetchOrderPizzas(); 
  }
};
</script>

<style scoped>

.container {
  max-width: 1000px; 
  margin: 0 auto;
  padding: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.table th, .table td {
  padding: 8px;
  text-align: left;
}
.table thead th {
  background-color: #f2f2f2;
  font-weight: bold;
}
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-success {
  background-color: #28a745;
  color: white;
  border: 1px solid #28a745;
}
.btn-danger {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}
.btn-warning {
  background-color: #ffc107;
  color: #212529;
  border: 1px solid #ffc107;
}
.btn-info {
  background-color: #17a2b8;
  color: white;
  border: 1px solid #17a2b8;
}
.mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
</style>