<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <a class="navbar-brand ml-2" href="/">SpyFall</a>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0 mr-2">
          <li class="nav-item" @click="collapseNavBar" :class="{ active: this.$route.name === 'home' }">
            <router-link class="nav-link ml-4" :to="{ name: 'home' }">Главная</router-link>
          </li>
          <li class="nav-item" @click="collapseNavBar" :class="{ active: this.$route.name === 'game' }">
            <router-link class="nav-link ml-4" :to="{ name: 'game' }">Играть</router-link>
          </li>
          <li class="nav-item" @click="collapseNavBar" :class="{ active: this.$route.name === 'locations' }">
            <router-link class="nav-link ml-4" :to="{ name: 'locations' }">Локации</router-link>
          </li>
          <li class="nav-item" @click="collapseNavBar" :class="{ active: this.$route.name === 'rules' }">
            <router-link class="nav-link ml-4" :to="{ name: 'rules' }">Правила</router-link>
          </li>
        </ul>
      </div>
      <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <div class="container">
      <transition name="page" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data: function () {
      return {
        loading: false
      }
    },
    methods: {
      collapseNavBar () {
        let toggler = document.getElementById('navbarToggler');
        if (toggler.classList.contains('show')) {
          toggler.classList.remove('show');
        }
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans&subset=cyrillic');
body {
  background: #ccd5dd;
}
#app {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
.cursor-pointer {
  cursor: pointer;
}
.page-enter-active, .page-leave-active {
  transition: opacity .3s, transform .3s ease;
}
.page-enter {
  opacity: 0;
  transform: translateY(-10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.flip-enter-active {
  transition: transform .4s ease;
}
..flip-leave-active {
  transition: transform .3s ease;
}
.flip-enter {
  transform: rotateY(-180deg);
}
.flip-leave-to {
  transform: rotateY(180deg);
}
</style>
