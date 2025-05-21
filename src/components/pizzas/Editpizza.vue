<template>
  <div class="container text-start mt-4">
    <h1 class="text-primary fw-bold">Editar Pizza</h1>
    <div class="card shadow-sm">
      <div class="card-header fw-bold bg-light">
        Detalles de la Pizza
      </div>
      <div class="card-body">
        <form @submit.prevent="updatePizza">
          <div class="row mb-3">
            <label for="id" class="form-label">ID</label>
            <div class="input-group">
              <div class="input-group-text">#</div>
              <input
                type="text"
                class="form-control"
                id="id"
                v-model="pizza.id"
                disabled
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="pizza-slice" />
              </div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nombre de la pizza"
                v-model="pizza.name"
                required
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="description" class="form-label">Descripción</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="info-circle" />
              </div>
              <textarea
                class="form-control"
                id="description"
                placeholder="Descripción de la pizza"
                v-model="pizza.description"
                rows="3"
                required
              ></textarea>
            </div>
          </div>

          <div class="row mb-3">
            <label for="price" class="form-label">Precio</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="dollar-sign" />
              </div>
              <input
                type="number"
                step="0.01"
                class="form-control"
                id="price"
                placeholder="Precio de la pizza"
                v-model="pizza.price"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Actualizar</button>
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
  name: 'EditPizza',
  data() {
    return {
      pizza: {
        id: 0,
        name: '',
        description: '',
        price: 0
      },
      loading: true,
      error: null
    };
  },
  methods: {
    // Método para cancelar la edición y volver a la lista de pizzas
    cancel() {
      this.$router.push({ name: 'Pizzas' });
    },
    // Método para actualizar la pizza
    async updatePizza() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/pizzas/${this.pizza.id}`, this.pizza);
        if (res.status === 200) {
          this.$router.push({ name: 'Pizzas' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Pizza actualizada correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.error = `Error al actualizar: Código de estado ${res.status}`;
          Swal.fire('Error', this.error, 'error');
        }
      } catch (error) {
        this.error = 'No se pudo actualizar la pizza.';
        if (error.response) {
          this.error += ` Código: ${error.response.status}. Mensaje: ${error.response.data.message || 'Error del servidor.'}`;
        } else if (error.request) {
          this.error += ' No se recibió respuesta del servidor.';
        } else {
          this.error += ` Mensaje: ${error.message}`;
        }
        Swal.fire('Error', this.error, 'error');
        console.error('Error updating pizza:', error);
      } finally {
        this.loading = false;
      }
    },
    // Método para cargar los datos de la pizza a editar
    async fetchPizza() {
      this.loading = true;
      this.error = null;
      try {
        const pizzaId = this.$route.params.id;
        const response = await axios.get(`http://127.0.0.1:8000/api/pizzas/${pizzaId}`);
        this.pizza = response.data.pizza; // Asume que la API devuelve { pizza: {...} }
      } catch (error) {
        this.error = 'No se pudo cargar la información de la pizza.';
        if (error.response) {
          this.error += ` Código: ${error.response.status}. Mensaje: ${error.response.data.message || 'Error del servidor.'}`;
        } else if (error.request) {
          this.error += ' No se recibió respuesta del servidor.';
        } else {
          this.error += ` Mensaje: ${error.message}`;
        }
        Swal.fire('Error', this.error, 'error');
        console.error('Error fetching pizza for edit:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchPizza(); // Cargar la pizza cuando el componente se monta
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