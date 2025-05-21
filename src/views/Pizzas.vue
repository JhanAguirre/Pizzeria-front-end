<template>
  <div class="container mt-4">
    <h1 class="text-start mb-4">
      Listado de Pizzas
      <button @click="newPizza()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <div v-if="loading" class="text-center py-4">
      <p>Cargando pizzas...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      <strong>Error:</strong> {{ error }}
      <p class="mt-2">Por favor, asegúrate de que el servidor Laravel esté funcionando y que la URL de la API sea correcta.</p>
    </div>

    <div v-else-if="pizzas.length > 0">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pizza, index) in pizzas" :key="pizza.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ pizza.name }}</td>
            <td>{{ pizza.description }}</td>
            <td>${{ pizza.price ? pizza.price.toFixed(2) : '0.00' }}</td>
            <td>
              <button @click="editPizza(pizza.id)" class="btn btn-warning mx-2">
                <font-awesome-icon icon="edit" />
              </button>
              <button @click="deletePizza(pizza.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-4">
      <p>No se encontraron pizzas. La lista está vacía.</p>
      <p>Puedes agregar una nueva pizza haciendo clic en el botón <font-awesome-icon icon="plus" />.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Pizzas',
  data() {
    return {
      pizzas: [],
      loading: true,
      error: null
    };
  },
  methods: {
    // Método para obtener todas las pizzas desde la API
    fetchPizzas() {
      this.loading = true;
      this.error = null;
      axios.get('http://127.0.0.1:8000/api/pizzas')
        .then(response => {
          this.pizzas = response.data.pizzas;
        })
        .catch(error => {
          this.error = 'No se pudo cargar la información de las pizzas.';
          console.error('Error fetching pizzas:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // Método para navegar a la página de creación de nueva pizza
    newPizza() {
      this.$router.push({ name: 'NewPizza' });
    },
    // Método para navegar a la página de edición de pizza
    editPizza(id) {
      this.$router.push({ name: 'EditPizza', params: { id: id } });
    },
    // Método para eliminar una pizza
    deletePizza(id) {
      Swal.fire({
        title: `¿Deseas eliminar la Pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success');
                this.fetchPizzas(); // Recargar la lista de pizzas después de eliminar
              } else {
                Swal.fire('Error', response.data.message || 'No se pudo eliminar la pizza.', 'error');
              }
            })
            .catch(error => {
              this.error = 'Error al eliminar la pizza.';
              Swal.fire('Error', this.error, 'error');
              console.error('Error deleting pizza:', error);
            });
        }
      });
    }
  },
  mounted() {
    this.fetchPizzas(); // Cargar las pizzas cuando el componente se monta
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.container {
  max-width: 960px;
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
.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>