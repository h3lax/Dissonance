<template>
  <div>
    <NuxtRouteAnnouncer />
      <Navbar />
      <Drawer />
      <iframe 
        src="/game/index.html"
        class="game-dim m-auto border border-base-300 rounded-md"
        allowfullscreen
        frameborder="0"
      />
  </div>
</template>
<style>
  .game-dim{
    height: 800px;
    width: 1200px;
  }
</style>