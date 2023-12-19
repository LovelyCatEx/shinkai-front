<script setup lang="ts">

</script>

<template>
  <div class="lo-footer-container">
    <div class="lo-footer">
      ©2023 All rights reserved by LovelyCat
    </div>
  </div>
</template>

<style scoped lang="scss">
@include b("footer-container") {
  width: 100%;
  padding: var(--padding-giant) var(--padding-normal);
  background: #707070;
}

@include b("footer") {
  color: white;
  text-align: center;
}
</style>