<template>
  <div class="navbar">
    <div class="filter" @click="menuClick2"></div>
    <div class="nav--container">

      <div class="logo">
        <h1>T.P.P.</h1>
        <h4>lffnF in the chat</h4>
      </div>

      <ul class="nav">
        <li>
          <router-link v-on:click.native="menuClick2" to="/">Home</router-link>
        </li>
        <!-- <li><router-link v-on:click.native="menuClick2" to="/about">About</router-link></li> -->
        <li><router-link v-on:click.native="menuClick2" to="/players/plup">Plup</router-link></li>
        <li><router-link v-on:click.native="menuClick2" to="/players/leffen">Leffen</router-link></li>
        <li><router-link v-on:click.native="menuClick2" to="/players/mango">Mango</router-link></li>
        <li><router-link v-on:click.native="menuClick2" to="/players/lucky">Lucky</router-link></li>
      </ul>

      <footer>
        <a href="http://colehollant.com/">Made By Cole Hollant</a>
      </footer>
    </div>
    <div class="phone--nav">
      <div id="left--phone">
        <h1>T.P.P</h1>
      </div>
      <font-awesome-icon icon="bars" class="hamburger" v-on:click="menuClick"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "Navbar",
  methods: {
    menuClick: function(event) {
      this.menuUp = true;
      document.querySelector(".nav--container").classList.add('active');
      document.querySelector(".filter").classList.add('active');
    },
    menuClick2: function(event) {
      this.menuUp = false;
      document.querySelector(".nav--container").classList.remove('active', false);
      document.querySelector(".filter").classList.remove('active', false);
    }
  }
};
</script>

<style>
.filter{
  display: none;
}
.filter.active{
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(42, 42, 42, 0.75);
  width: 100%;
  height: 100%;
  z-index: 2;
}
.phone--nav{
  position: sticky;
  display: flex;
  flex-direction: row;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background-color: #523f80;
  z-index: 1;
}
.phone--nav #left--phone{
  display: flex;
  height: 100%;
  background: #0000001c;
  box-shadow: 6px 0px 18px #00000030;
}
.phone--nav #left--phone h1{
  margin: auto;
  padding: 0 1rem 0 1rem;
}

.hamburger{
  margin: auto 1rem auto auto;
  cursor: pointer;
}
.nav--container {
  display: none;
}
.nav--container.active {
  position: fixed;
  background-color: #523f80;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  box-shadow: 10px 0px 18px #0000003f;
  z-index: 3;
}
.logo{
  padding: 2rem 1rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.137);
}
.nav {
  list-style-type: none;
  padding: 1rem;
  line-height: 2rem;
  margin: 1rem auto;
}
.nav a {
  font-weight: bold;
  color: #6892bb;
  text-decoration: none;
}
.nav a.router-link-exact-active {
  color: #75f5bb;
}
.nav--container footer{
  margin-top: auto;
  padding: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.2);
}
footer a {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
  text-decoration: none;
}










@media only screen and (min-width: 1000px) {

.phone--nav{
  display: none;
}
.filter, .filter.filter.active{
  display: none;
}

.nav--container, .nav--container.active {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #523f80;
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 18px #0000003f;
  z-index: 3;
}
.nav {
  display: flex;
  margin: auto auto auto 0;
}
.nav a {
  margin: 1rem;
}

.logo{
  text-align: left;
  display: flex;
  padding: 0 2rem 0 1rem;
}
.logo h1{
  margin: auto 2rem auto auto;
}
.logo h4{
  margin: auto;
  color: #b8b8b8;
}


}
</style>
