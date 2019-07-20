import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Streamer from '@/views/Players/Streamer.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import("./views/About.vue")
    },
    {
      path: "/players/plup",
      name: "plup",
      component: Streamer,
      props: {
        streamerName: "Plup",
        twitchHandle: "plup",
        twitterHandle: "PG_Plup"
      }
    },
    {
      path: "/players/leffen",
      name: "leffen",
      component: Streamer,
      props: {
        streamerName: "Leffen",
        twitchHandle: "leffen",
        twitterHandle: "TSM_Leffen"
      }
    },
    {
      path: "/players/mango",
      name: "mango",
      component: Streamer,
      props: {
        streamerName: "Mango",
        twitchHandle: "mang0",
        twitterHandle: "C9Mang0"
      }
    },
    {
      path: "/players/lucky",
      name: "lucky",
      component: Streamer,
      props: {
        streamerName: "Lucky",
        twitchHandle: "legend0flucky",
        twitterHandle: "Legend0fLucky"
      }
    },
  ]
});
