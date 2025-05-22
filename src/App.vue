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
            <router-link to="/order-pizzas" class="nav-link" active-class="active">Órdenes de Pizza</router-link>
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
  name: 'App',
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


.navbar {
  margin-bottom: 20px;
}

.navbar-brand {
  font-weight: bold;
  color: #fff !important;
}

.nav-link {
  color: rgba(255, 255, 255, 0.75) !important;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 1) !important;
}

.nav-link.active {
  color: #42b983 !important;
  font-weight: bold;
}


nav {
  padding: 0;
}

nav a {
  font-weight: normal;
  color: inherit;
}

nav a.router-link-exact-active {
 
}
</style>