<template>
  <div>
    <NuxtRouteAnnouncer />
      <Navbar />
      <Drawer />
      <embed
        class="game-dim m-auto border border-base-300 rounded-md"
        src="/ressources/Merged.pdf" 
        allowfullscreen
        type="application/pdf">
  </div>
</template>
<style>
  .game-dim{
    height: 800px;
    width: 1200px;
  }
</style>