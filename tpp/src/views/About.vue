<template>
  <div class="about">
    <aside class="header">
      <h1>About</h1>
    </aside>
    <main class="body">
      <p>This is a project to try and give some melee players exposure!</p>
    </main>
  </div>
</template>

<script>
export default {
  name: "about",
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




@media only screen and (min-width: 1000px) {
.about{
  max-width: 60vw;
  margin: auto;
}



}
</style>
