import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Game from './views/Game';
import Locations from './views/Locations';
import Rules from './views/Rules';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations
    },
    {
      path: '/rules',
      name: 'rules',
      component: Rules
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

export default router;
