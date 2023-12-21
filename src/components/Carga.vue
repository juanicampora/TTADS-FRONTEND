
<template>
  <div class="overlay disable-clicks">
    <div class="spinner-grow text-success" style="width: 7rem; height: 7rem; border-width:8px" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.disable-clicks {
  pointer-events: none;
}
</style>