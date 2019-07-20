<template>
  <div id="app">
    <aside class="aside">
      <Navbar/>
    </aside>

    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Home from "@/views/Home.vue";

export default {
  name: "home",
  components: {
    Navbar,
    Home
  }
};
</script>


<style>
@import 'css/main.css';
</style>
