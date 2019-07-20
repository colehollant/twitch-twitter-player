<template>
  <div class="home">
    <aside class="header">
      <h1>Home</h1>
    </aside>
    <main class="body">
      <p>This is a project to give some melee players some exposure!</p>
      <a href="http://colehollant.com">My site</a>
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style scoped>
.header h1{
  font-size: 1.75rem;
}

.body p{
  line-height: 1.35rem;
  font-size: 1.2rem;
  color: #d8d8d8;
}
a{
  line-height: 1.35rem;
  font-size: 1.2rem;
  color: #ca9ecf;
  text-decoration: none;
}




@media only screen and (min-width: 1000px) {
.home{
  max-width: 60vw;
  margin: auto;
}

}
</style>
