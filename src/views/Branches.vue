<template>
      <div class="container mt-4">
        <h1 class="text-start mb-4">
          Listado de Sucursales
          </h1>

        <div v-if="loading" class="text-center py-4">
          <p>Cargando sucursales...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger" role="alert">
          <strong>Error:</strong> {{ error }}
          <p class="mt-2">Por favor, asegúrate de que el servidor Laravel esté funcionando y que la URL de la API sea correcta.</p>
        </div>

        <div v-else-if="branches.length > 0">
          <table class="table table-striped table-hover table-bordered shadow-sm rounded-lg">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Dirección</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(branch, index) in branches" :key="branch.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ branch.name }}</td>
                <td>{{ branch.address }}</td>
                <td>
                  <button @click="showBranch(branch.id)" class="btn btn-info mx-1">
                    <font-awesome-icon icon="eye" />
                  </button>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-4">
          <p>No se encontraron sucursales. La lista está vacía.</p>
        </div>
      </div>
    </template>

    <script>
    import axios from 'axios';
    import Swal from 'sweetalert2';

    export default {
      name: 'Branches',
      data() {
        return {
          branches: [],
          loading: true,
          error: null
        };
      },
      methods: {
        // Método para obtener todas las sucursales desde la API
        fetchBranches() {
          this.loading = true;
          this.error = null;
          axios.get('http://127.0.0.1:8000/api/branches')
            .then(response => {
              this.branches = response.data.branches;
            })
            .catch(error => {
              this.error = 'No se pudo cargar la información de las sucursales.';
              console.error('Error fetching branches:', error);
            })
            .finally(() => {
              this.loading = false;
            });
        },
        // Método para navegar a la página de visualización de sucursal
        showBranch(id) {
          this.$router.push({ name: 'ShowBranch', params: { id: id } });
        },
        // Se eliminan los métodos newBranch y editBranch
        // Se elimina el método deleteBranch
      },
      mounted() {
        this.fetchBranches(); // Cargar las sucursales cuando el componente se monta
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
    .btn-info { /* Estilo para el botón "Ver" */
      background-color: #17a2b8;
      color: white;
      border: 1px solid #17a2b8;
    }
    .mx-1 {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
    </style>