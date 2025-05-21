<template>
  <div class="container text-start mt-4">
    <h1 class="text-primary fw-bold">Detalles de la Sucursal</h1>
    <div class="card shadow-sm">
      <div class="card-header fw-bold bg-light">
        Información de la Sucursal
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <p>Cargando detalles de la sucursal...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          <strong>Error:</strong> {{ error }}
          <p class="mt-2">Por favor, asegúrate de que el ID de la sucursal sea válido y que el servidor Laravel esté funcionando.</p>
        </div>

        <div v-else>
          <div class="mb-3">
            <strong>ID:</strong> {{ branch.id }}
          </div>
          <div class="mb-3">
            <strong>Nombre:</strong> {{ branch.name }}
          </div>
          <div class="mb-3">
            <strong>Dirección:</strong> {{ branch.address }}
          </div>
          <div class="mb-3">
            <strong>Creada el:</strong> {{ branch.created_at ? new Date(branch.created_at).toLocaleString() : 'N/A' }}
          </div>
          <div class="mb-3">
            <strong>Última actualización:</strong> {{ branch.updated_at ? new Date(branch.updated_at).toLocaleString() : 'N/A' }}
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
  name: 'ShowBranch',
  data() {
    return {
      branch: {},
      loading: true,
      error: null
    };
  },
  methods: {
    // Método para obtener los detalles de una sucursal específica
    async fetchBranchDetails() {
      this.loading = true;
      this.error = null;
      try {
        const branchId = this.$route.params.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/branches/${branchId}`);
        this.branch = response.data.branch;
      } catch (error) {
        this.error = 'No se pudo cargar la información de la sucursal.';
        if (error.response) {
          this.error += ` Código: ${error.response.status}. Mensaje: ${error.response.data.message || 'Error del servidor.'}`;
        } else if (error.request) {
          this.error += ' No se recibió respuesta del servidor.';
        } else {
          this.error += ` Mensaje: ${error.message}`;
        }
        Swal.fire('Error', this.error, 'error');
        console.error('Error fetching branch details:', error);
      } finally {
        this.loading = false;
      }
    },
    // Método para volver a la lista de sucursales
    goBack() {
      this.$router.push({ name: 'Branches' });
    }
  },
  mounted() {
    this.fetchBranchDetails(); // Cargar los detalles de la sucursal cuando el componente se monta
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