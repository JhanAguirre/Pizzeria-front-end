<template>
  <div class="container mt-4">
    <h1 class="text-start mb-4">
      Listado de Ingredientes Extras
      <button @click="newExtraIngredient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <div v-if="loading" class="text-center py-4">
      <p>Cargando ingredientes extras...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      <strong>Error:</strong> {{ error }}
      <p class="mt-2">Por favor, asegúrate de que el servidor Laravel esté funcionando y que la URL de la API sea correcta.</p>
    </div>

    <div v-else-if="extraIngredients.length > 0">
      <table class="table table-striped table-hover table-bordered shadow-sm rounded-lg">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Tipo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ingredient, index) in extraIngredients" :key="ingredient.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ ingredient.name }}</td>
            <td>${{ ingredient.price ? ingredient.price.toFixed(2) : '0.00' }}</td>
            <td>{{ ingredient.description || 'N/A' }}</td>
            <td>{{ ingredient.ingredient_type || 'N/A' }}</td>
            <td>
              <button @click="showExtraIngredient(ingredient.id)" class="btn btn-info mx-1">
                <font-awesome-icon icon="eye" />
              </button>
              <button @click="editExtraIngredient(ingredient.id)" class="btn btn-warning mx-1">
                <font-awesome-icon icon="edit" />
              </button>
              <button @click="deleteExtraIngredient(ingredient.id)" class="btn btn-danger mx-1">
                <font-awesome-icon icon="trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-4">
      <p>No se encontraron ingredientes extras. La lista está vacía.</p>
      <p>Puedes agregar un nuevo ingrediente haciendo clic en el botón <font-awesome-icon icon="plus" />.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'ExtraIngredients',
  data() {
    return {
      extraIngredients: [],
      loading: true,
      error: null
    };
  },
  methods: {
    // Método para obtener todos los ingredientes extras desde la API
    fetchExtraIngredients() {
      this.loading = true;
      this.error = null;
      axios.get('http://127.0.0.1:8000/api/extra_ingredients')
        .then(response => {
          this.extraIngredients = response.data.extraIngredients;
        })
        .catch(error => {
          this.error = 'No se pudo cargar la información de los ingredientes extras.';
          console.error('Error fetching extra ingredients:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // Método para navegar a la página de creación de nuevo ingrediente
    newExtraIngredient() {
      this.$router.push({ name: 'NewExtraIngredient' });
    },
    // Método para navegar a la página de edición de ingrediente
    editExtraIngredient(id) {
      this.$router.push({ name: 'EditExtraIngredient', params: { id: id } });
    },
    // Método para navegar a la página de visualización de ingrediente
    showExtraIngredient(id) {
      this.$router.push({ name: 'ShowExtraIngredient', params: { id: id } });
    },
    // Método para eliminar un ingrediente extra
    deleteExtraIngredient(id) {
      Swal.fire({
        title: `¿Deseas eliminar el Ingrediente Extra con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/extra_ingredients/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success');
                this.fetchExtraIngredients(); // Recargar la lista
              } else {
                Swal.fire('Error', response.data.message || 'No se pudo eliminar el ingrediente extra.', 'error');
              }
            })
            .catch(error => {
              this.error = 'Error al eliminar el ingrediente extra.';
              Swal.fire('Error', this.error, 'error');
              console.error('Error deleting extra ingredient:', error);
            });
        }
      });
    }
  },
  mounted() {
    this.fetchExtraIngredients(); // Cargar los ingredientes cuando el componente se monta
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.container {
  max-width: 1000px; /* Ajustado para más columnas */
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