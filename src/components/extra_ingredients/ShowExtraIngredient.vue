<template>
  <div class="container text-start mt-4">
    <h1 class="text-primary fw-bold">Detalles del Ingrediente Extra</h1>
    <div class="card shadow-sm">
      <div class="card-header fw-bold bg-light">
        Información del Ingrediente
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <p>Cargando detalles del ingrediente extra...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          <strong>Error:</strong> {{ error }}
          <p class="mt-2">Por favor, asegúrate de que el ID del ingrediente sea válido y que el servidor Laravel esté funcionando.</p>
        </div>

        <div v-else>
          <div class="mb-3">
            <strong>ID:</strong> {{ extraIngredient.id }}
          </div>
          <div class="mb-3">
            <strong>Nombre:</strong> {{ extraIngredient.name }}
          </div>
          <div class="mb-3">
            <strong>Precio:</strong> ${{ extraIngredient.price ? extraIngredient.price.toFixed(2) : '0.00' }}
          </div>
          <div class="mb-3">
            <strong>Descripción:</strong> {{ extraIngredient.description || 'N/A' }}
          </div>
          <div class="mb-3">
            <strong>Tipo de Ingrediente:</strong> {{ extraIngredient.ingredient_type || 'N/A' }}
          </div>
          <div class="mb-3">
            <strong>Creado el:</strong> {{ extraIngredient.created_at ? new Date(extraIngredient.created_at).toLocaleString() : 'N/A' }}
          </div>
          <div class="mb-3">
            <strong>Última actualización:</strong> {{ extraIngredient.updated_at ? new Date(extraIngredient.updated_at).toLocaleString() : 'N/A' }}
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
  name: 'ShowExtraIngredient',
  data() {
    return {
      extraIngredient: {},
      loading: true,
      error: null
    };
  },
  methods: {
    // Método para obtener los detalles de un ingrediente extra específico
    async fetchExtraIngredientDetails() {
      this.loading = true;
      this.error = null;
      try {
        const ingredientId = this.$route.params.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/extra_ingredients/${ingredientId}`);
        this.extraIngredient = response.data.extraIngredient;
      } catch (error) {
        this.error = 'No se pudo cargar la información del ingrediente extra.';
        if (error.response) {
          this.error += ` Código: ${error.response.status}. Mensaje: ${error.response.data.message || 'Error del servidor.'}`;
        } else if (error.request) {
          this.error += ' No se recibió respuesta del servidor.';
        } else {
          this.error += ` Mensaje: ${error.message}`;
        }
        Swal.fire('Error', this.error, 'error');
        console.error('Error fetching extra ingredient details:', error);
      } finally {
        this.loading = false;
      }
    },
    // Método para volver a la lista de ingredientes extras
    goBack() {
      this.$router.push({ name: 'ExtraIngredients' });
    }
  },
  mounted() {
    this.fetchExtraIngredientDetails(); // Cargar los detalles cuando el componente se monta
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