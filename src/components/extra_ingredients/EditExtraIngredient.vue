<template>
  <div class="container text-start mt-4">
    <h1 class="text-primary fw-bold">Editar Ingrediente Extra</h1>
    <div class="card shadow-sm">
      <div class="card-header fw-bold bg-light">
        Detalles del Ingrediente
      </div>
      <div class="card-body">
        <form @submit.prevent="updateExtraIngredient">
          <div class="row mb-3">
            <label for="id" class="form-label">ID</label>
            <div class="input-group">
              <div class="input-group-text">#</div>
              <input
                type="text"
                class="form-control"
                id="id"
                v-model="extraIngredient.id"
                disabled
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="name" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="leaf" />
              </div>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Nombre del ingrediente"
                v-model="extraIngredient.name"
                required
              />
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
                placeholder="Precio del ingrediente"
                v-model="extraIngredient.price"
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
                placeholder="Descripción del ingrediente (opcional)"
                v-model="extraIngredient.description"
                rows="2"
              ></textarea>
            </div>
          </div>

          <div class="row mb-3">
            <label for="ingredient_type" class="form-label">Tipo de Ingrediente</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input
                type="text"
                class="form-control"
                id="ingredient_type"
                placeholder="Ej: Vegetal, Carne, Queso"
                v-model="extraIngredient.ingredient_type"
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
  name: 'EditExtraIngredient',
  data() {
    return {
      extraIngredient: {
        id: 0,
        name: '',
        price: 0,
        description: '',
        ingredient_type: ''
      },
      loading: true,
      error: null
    };
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'ExtraIngredients' });
    },
    async updateExtraIngredient() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.put(`http://127.0.0.1:8000/api/extra_ingredients/${this.extraIngredient.id}`, this.extraIngredient);
        if (res.status === 200) {
          this.$router.push({ name: 'ExtraIngredients' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Ingrediente extra actualizado correctamente!',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          this.error = `Error al actualizar: Código de estado ${res.status}`;
          Swal.fire('Error', this.error, 'error');
        }
      } catch (error) {
        this.error = 'No se pudo actualizar el ingrediente extra.';
        if (error.response) {
          this.error += ` Código: ${error.response.status}. Mensaje: ${error.response.data.message || 'Error del servidor.'}`;
        } else if (error.request) {
          this.error += ' No se recibió respuesta del servidor.';
        } else {
          this.error += ` Mensaje: ${error.message}`;
        }
        Swal.fire('Error', this.error, 'error');
        console.error('Error updating extra ingredient:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchExtraIngredient() {
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
        console.error('Error fetching extra ingredient for edit:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchExtraIngredient();
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