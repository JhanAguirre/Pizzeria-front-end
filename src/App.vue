<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Pizzería App</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pizzas" class="nav-link" active-class="active">Pizzas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/branches" class="nav-link" active-class="active">Sucursales</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/extra-ingredients" class="nav-link" active-class="active">Ingredientes Extras</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App', // Es una buena práctica nombrar el componente raíz
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Estilos para la barra de navegación de Bootstrap */
.navbar {
  margin-bottom: 20px; /* Espacio debajo de la barra de navegación */
}

.navbar-brand {
  font-weight: bold;
  color: #fff !important; /* Asegura que el color del texto de la marca sea blanco */
}

.nav-link {
  color: rgba(255, 255, 255, 0.75) !important; /* Color de texto para enlaces normales */
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 1) !important; /* Color de texto al pasar el mouse */
}

.nav-link.active {
  color: #42b983 !important; /* Color para el enlace activo */
  font-weight: bold;
}

/* Estilos generales para el resto de la aplicación */
nav {
  padding: 0; /* Ya manejado por la barra de navegación de Bootstrap */
}

nav a {
  font-weight: normal; /* Restablecer el peso de la fuente, ya que Bootstrap lo maneja */
  color: inherit; /* Heredar color, ya que Bootstrap lo maneja */
}

/* Puedes mantener o ajustar estos si son necesarios para otros elementos */
nav a.router-link-exact-active {
  /* Este estilo se superpone con .nav-link.active de Bootstrap,
     puedes ajustarlo si necesitas un color diferente para la ruta exacta */
}
</style>